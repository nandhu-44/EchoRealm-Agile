import { exec } from 'child_process';
import { config } from 'dotenv';
config({ path: '../.env' });
const { SOURCE_MAP_GENERATION: sourceMapGen } = process.env;

const buildCmd = process.platform === 'win32' ? `set \"GENERATE_SOURCEMAP=${sourceMapGen}\" && react-scripts build` : `GENERATE_SOURCEMAP=${sourceMapGen} react-scripts build`;

exec(buildCmd, (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stdout);
    console.error(stderr);
});