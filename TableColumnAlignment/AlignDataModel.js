const fs = require('fs')

const table_name = 'ltbl_Import_NoakaRest_RevisionFiles'

const columns = [
    {
        "name": "INTEGR_REC_GROUPREF",
        "type": "uniqueidentifier"
    },
    {
        "name": "INTEGR_REC_BATCHREF",
        "type": "uniqueidentifier"
    },
    {
        "name": "INTEGR_REC_STATUS",
        "type": "nvarchar",
        "length": "50"
    },
    {
        "name": "INTEGR_REC_ERROR",
        "type": "nvarchar",
        "length": "max"
    },
    {
        "name": "INTEGR_REC_TRACE",
        "type": "nvarchar",
        "length": "max"
    }
]

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

fs.writeFileSync('./AlignDataModel.sql', output)