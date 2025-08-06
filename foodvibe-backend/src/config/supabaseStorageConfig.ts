import { createClient } from "@supabase/supabase-js";   

const supabaseUrl = process.env.PROJECT_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;
if (!supabaseUrl || !supabaseKey) {
    console.log(supabaseUrl, supabaseKey);
  throw new Error("Supabase URL or Key is not defined in environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);