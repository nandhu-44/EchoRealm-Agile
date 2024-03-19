import { createClient } from '@supabase/supabase-js';

const { SUPABASE_URL, SUPABASE_API_KEY } = process.env;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_API_KEY);

module.exports = supabaseClient;