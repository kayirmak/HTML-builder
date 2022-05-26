const fs = require('fs')
const path = require('path')


let txt = fs.createReadStream(path.resolve(__dirname, 'text.txt'), 'utf-8');
let data = '';
txt.on('data', chunk => data += chunk);
txt.on('end', () => console.log(data));
txt.on('error', error => console.log('Error', error.message));