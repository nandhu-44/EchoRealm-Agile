const { createClient } = require('@supabase/supabase-js');
const chalk = require("chalk");

const { SUPABASE_URL, SUPABASE_API_KEY } = process.env;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_API_KEY);

if(supabaseClient) console.log(chalk.green("Connected to Supabase ⚡"));

module.exports = supabaseClient;