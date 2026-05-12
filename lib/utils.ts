/**
 * Appends transformation parameters to Supabase storage URLs
 * to optimize image delivery (e.g., converting to WebP)
 */
export const getOptimizedImage = (url: string | null | undefined) => {
  if (!url) return "";
  
  // If it's already a transformed URL or not a Supabase URL, return as is
  const isSupabase = url.includes("supabase.co") || url.includes("/storage/v1/object/public/");
  
  if (url.includes("?format=") || !isSupabase) {
    return url;
  }

  // Handle both external storage URLs and potentially relative ones
  // Supabase storage URLs usually look like: 
  // https://[id].supabase.co/storage/v1/object/public/[bucket]/[path]
  
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}format=webp`;
};
