import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing SUPABASE_URL or SUPABASE_KEY. Did you create a .env file from .env.example?'
  );
}

// This client uses the public "anon" key - safe to use from a server or app.
// Never use the service_role key here; it bypasses all security (Row Level Security etc).
export const supabase = createClient(supabaseUrl, supabaseKey);
