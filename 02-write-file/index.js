const fs = require('fs')
const path = require('path')
const { stdin, stdout } = process

fs.access(path.resolve(__dirname, 'text.txt'), err => {
    if (err) {
        console.log('Файл не найден');
        fs.writeFile(path.resolve(__dirname, 'text.txt'), '', err => {
            if (err) console.log(err.message);
            console.log('Файл создан');
        })
    }
    else {
        console.log('Файл найден');
    }
})

const txt = fs.createWriteStream(path.resolve(__dirname, 'text.txt'))

stdout.write('Напишите любимый цвет')
stdin.on('data', data => {
    console.log(data.toString());
    if (data.toString().includes('exit')) {
        stdout.write('yesexit');
        process.exit()
    }
})
// process.on('exit', () => stdin.write('Пока'))
// const txt = fs.createWriteStream()