import env from 'fibe-env';
import myModule from './mymodule.js'

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 


const options = {
    file: '_env',
    path: __dirname,
    strict: true,
    checkout: false,
    processEnv: false,
    global: false,
    intrinsics: false
}
const newEnv = new env(options);

console.log(env.meta);  //cannot be accessed or altered if not checked out
console.log(env.env);   //cannot be accessed or altered if not checked out

myModule()
console.log('example.js', env.getEnv().ENV_NODE_KEY2)
console.log('example.js', env.getEnv())
