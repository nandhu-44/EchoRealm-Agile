const { createClient } = require('@supabase/supabase-js');
const chalk = require("chalk");

const { SUPABASE_URL, SUPABASE_API_KEY } = process.env;

try {
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_API_KEY);
    console.log(chalk.green("Connected to Supabase ⚡"));
    module.exports = supabaseClient;
} catch (error) {
    console.error(chalk.red("Error connecting to Supabase: ") + error?.message);
    console.error(chalk.red(error));
}
