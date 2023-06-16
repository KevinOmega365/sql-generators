const fs = require('fs')

const [nodeEngine, thisScript, sourceJsonPathArgument, sinkSqlPathArgument] = process.argv

sourceFile = sourceJsonPathArgument || './SampleTableColumns.json'
sinkFile = sinkSqlPathArgument || './AlignDataModel.sql'

const tableColumns = JSON.parse(fs.readFileSync(sourceFile))

const table_name = tableColumns.name
const columns = tableColumns.columns

const getType = (column) =>
{
    if(!column.type) return 'nvarchar(max)'

    if(!column.length) return column.type

    return `${column.type}(${column.length})`
}

let output = ''

columns.forEach(column =>
{
    output +=
`
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${table_name}' AND COLUMN_NAME = '${column.name}')
    BEGIN
        ALTER TABLE ${table_name} ADD [${column.name}] ${getType(column)} NULL;
    END;`
})

fs.writeFileSync(sinkFile, output)