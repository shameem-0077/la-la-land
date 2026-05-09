"use server";

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''; // Using what's in .env as it seems to be service_role

async function getRecursiveFiles(supabase: any, bucketName: string, path: string = ''): Promise<any[]> {
  const { data, error } = await supabase.storage.from(bucketName).list(path, {
    limit: 1000,
    sortBy: { column: 'name', order: 'asc' }
  });

  if (error) {
    console.error(`Error listing path ${path} in bucket ${bucketName}:`, error);
    return [];
  }

  let allFiles: any[] = [];

  for (const item of data || []) {
    if (item.id === null) {
      // It's a folder
      const folderPath = path ? `${path}/${item.name}` : item.name;
      const subFolderFiles = await getRecursiveFiles(supabase, bucketName, folderPath);
      allFiles = [...allFiles, ...subFolderFiles];
    } else {
      // It's a file - add the full path from the bucket root
      allFiles.push({
        ...item,
        fullPath: path ? `${path}/${item.name}` : item.name
      });
    }
  }

  return allFiles;
}

export async function getRealBuckets() {
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const { data, error } = await supabase.storage.listBuckets();
  
  if (error) {
    console.error("Server-side storage fetch error:", error);
    throw new Error(error.message);
  }

  // Add summary stats for each bucket (file count & size)
  const bucketsWithStats = await Promise.all((data || []).map(async (bucket) => {
    try {
      const allFiles = await getRecursiveFiles(supabase, bucket.name);
      
      const totalSize = allFiles.reduce((acc, file) => {
        const size = file.metadata?.size || 0;
        return acc + size;
      }, 0);

      return { 
        ...bucket, 
        fileCount: allFiles.length,
        totalSize: totalSize,
        recentFiles: allFiles.slice(0, 5)
      };
    } catch (e) {
      console.error(`Failed to process bucket ${bucket.name}:`, e);
      return { ...bucket, fileCount: 0, totalSize: 0 };
    }
  }));
  
  return bucketsWithStats;
}

export async function getBucketDetails(bucketId: string) {
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const { data: bucket, error: bucketError } = await supabase.storage.getBucket(bucketId);
  
  if (bucketError) throw new Error(bucketError.message);

  const allFiles = await getRecursiveFiles(supabase, bucketId);

  const stats = allFiles.reduce((acc, file) => {
    acc.totalSize += (file.metadata?.size || 0);
    acc.fileCount += 1;
    const ext = file.name.split('.').pop()?.toLowerCase() || 'unknown';
    acc.types[ext] = (acc.types[ext] || 0) + 1;
    return acc;
  }, { totalSize: 0, fileCount: 0, types: {} as Record<string, number> });

  return {
    ...bucket,
    files: allFiles,
    stats
  };
}
