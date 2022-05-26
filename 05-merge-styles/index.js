const fs = require('fs')
const path = require('path')
const { readdir } = require('fs/promises')
const { stdout } = require('process')

async function mergeStyles() {
    const files = await readdir(path.resolve(__dirname, 'styles'), {withFileTypes: true})
    
    let data = ''
    let readFile

    files.forEach(el => {
        if (path.extname(el.name) === '.css') {
            
            readFile = fs.createReadStream(path.resolve(__dirname, 'styles', el.name), 'utf-8')
            readFile.on('data', chunk => data += chunk + '\n')
            readFile.on('error', err => console.error(err.message))
        }
        
    })

    readFile.on('end', () => {
        fs.writeFile(path.resolve(__dirname, 'project-dist', 'bundle.css'), data, err => {
            if (err) throw err
            stdout.write('css файл собран')
        })
    })
    
}
mergeStyles()

