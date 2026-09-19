import { createClient } from "@supabase/supabase-js";

const projecturl = import.meta.env.VITE_SUPABASE_URL;
const projectkey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const connectsupabase = createClient(projecturl, projectkey);