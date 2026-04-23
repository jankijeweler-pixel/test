import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gtkagclvdtpbvbxlxwil.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0a2FnY2x2ZHRwYnZieGx4d2lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MDA1MDcsImV4cCI6MjA5MjI3NjUwN30.1bZtnlAD7r057z7_nfPtOjaPehNKUAILN-gY3k3Wl6k';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from('products').select('*');
  console.log("Error:", error);
  console.log("Data length:", data ? data.length : 0);
  console.log("Data:", JSON.stringify(data, null, 2));
}

test();
