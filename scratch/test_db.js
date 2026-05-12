import { supabase } from "./lib/supabase.js";

async function testFetch() {
  const { data, error } = await supabase.from('Ride').select('*').limit(1);
  if (error) {
    console.log('Error fetching Ride:', error.message);
    const { data: data2, error: error2 } = await supabase.from('Rides').select('*').limit(1);
    if (error2) {
      console.log('Error fetching Rides:', error2.message);
    } else {
      console.log('Found table: Rides');
    }
  } else {
    console.log('Found table: Ride');
  }
}

testFetch();
