const fs = require('fs')

const readJSON = (path) => {
    fileData = fs.readFileSync(path)
    json = JSON.parse(fileData)
    return json
}

const writeJSON = (path, json) => {
    json_string = JSON.stringify(json)
    fs.writeFileSync(path, json_string)
}

module.exports = { readJSON, writeJSON }