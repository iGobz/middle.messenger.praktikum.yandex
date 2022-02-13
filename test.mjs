import * as fs from 'fs';

const tsconfig = () => {
    return JSON.parse(fs.readFileSync('./i.json', 'utf-8').toString());
}

console.log(tsconfig());