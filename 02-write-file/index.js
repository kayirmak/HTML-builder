const fs = require('fs')
const path = require('path')
const { stdin, stdout } = process

fs.access(path.resolve(__dirname, 'text.txt'), err => {
    if (err) {
        console.log('Файл не найден');
        fs.writeFile(path.resolve(__dirname, 'text.txt'), '', err => {
            if (err) console.log(err.message);
            console.log('Файл создан');
            stdout.write('Напиши любимую музыку\n')
        })
    }
    else {
        stdout.write('Напиши любимую музыку\n')
    }
})


stdin.on('data', data => {
    if (data.toString().includes('exit')) {
        stdout.write('Спасибо, у тебя хороший вкус, хотя о вкусах не спорят');
        process.exit()
    }
    fs.appendFile(path.resolve(__dirname, 'text.txt'), data.toString(), error => {
        if (error) throw error
        stdout.write('Запись добавлена, для завершения процесса введи "exit"\n')
    })
    // process.openStdin().on('keypress', function (chunk, key) {
    //     if (key && key.ctrl && key.name == 'c') {
    //         console.log('bye');
    //         process.exit()
    //     }
    // })
})
process.on('exit', () => stdin.write('Пока'))
