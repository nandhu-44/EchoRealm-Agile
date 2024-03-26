import { createClient } from '@supabase/supabase-js';

const { REACT_APP_SUPABASE_URL: supabaseUrl, REACT_APP_SUPABASE_API_KEY: supabaseApiKey } = process.env;
const supabaseClient = createClient(supabaseUrl, supabaseApiKey);

export default supabaseClient;