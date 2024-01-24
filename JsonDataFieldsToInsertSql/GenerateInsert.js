const fs = require('fs')
let outputSql = ''

const tableName = 'atbl_Fantasy_SimpleCharacters'
const configData = JSON.parse(fs.readFileSync('./input.json'))

console.log('¯\\_(ツ)_/¯')

fields = configData.fields.map(f => f.name)

// todo: expand this to support more than just null and string-y data
const formatValues = (row) =>
`(
    ${row
        .map(s => s === null && 'NULL' || `'${s}'`)
        .join(',\n    ')}
)`

outputSql +=
`insert into ${tableName}
(
    ${fields.join(',\n    ')}
)
values
${configData.data.map(formatValues)}
`

fs.writeFileSync('output.sql', outputSql, 'utf-8')