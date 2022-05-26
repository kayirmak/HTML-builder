const fs = require('fs')
const path = require('path')
const {copyFile, mkdir, readdir} = require('fs/promises');
const { stdout } = require('process');

async function copy() {
    const res = await mkdir(path.resolve(__dirname, 'files-copy'), {recursive: true})
    if (res) {
        stdout.write('Папка успешно создана\n')
    }
    
    const files = await readdir(path.resolve(__dirname, 'files'), {withFileTypes: true})
    const filesCopy = await readdir(path.resolve(__dirname, 'files-copy'), {withFileTypes: true})

    filesCopy.forEach(el => {
        fs.unlink(path.resolve(__dirname, 'files-copy', el.name), err => {
            if (err) {
                stdout.write('Файл удален')
                throw err
            }
        })
    })
    
    files.forEach(el => {
        copyFile(path.resolve(__dirname, 'files', el.name), `${__dirname}/files-copy/${el.name}`, fs.constants.COPYFILE_EXCL).then(res => {
            stdout.write('Файл скопирован\n')
        }).catch(err => {
            stdout.write('Файл уже существует\n');
        })
    })    
}
copy()

