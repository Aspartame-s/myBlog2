const fs = require('fs')
const path = require('path')

function getFileContent(fileName) {
    const promise = new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname, 'files', fileName)
        fs.readFile(fullFileName, (err, data) => {
            if(err) {
                reject(err)
            }
            resolve(JSON.parse(data.toString()))
        })
    })
    return promise
}

getFileContent('a.json').then(adata => {
    console.log(adata)
    return getFileContent(adata.next)
}).then(bdata => {
    console.log(bdata)
    return getFileContent(bdata.next)
}).then(bdata => {
    console.log(bdata)
})