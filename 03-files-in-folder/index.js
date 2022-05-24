const fs = require('fs')
const { readdir } = fs.promises
const path = require('path')
const { stdout } = require('process')

readdir(path.resolve(__dirname, 'secret-folder'), {withFileTypes: true}).then((res) => {

    res.forEach(el => {
        if (el.isFile()) {
            let extension = path.extname(el.name)
            fs.stat(path.resolve(__dirname, 'secret-folder', el.name), (err, stats) => {
                stdout.write(`${el.name.split('.').splice(0, 1).join()} - ${extension.slice(1)} - ${stats.size / 1024}kb\n`)
            })
        }
    })
})