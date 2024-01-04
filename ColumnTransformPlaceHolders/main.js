import fs from 'fs'
import { banner, bigBanner, tab } from './lib/TextBannersAndTabs.js'

const getUpdateStatement = (tableName, columnName) =>
    // significant whitespace
    `
    UPDATE I
    SET
        ${columnName} = ${columnName}
    FROM
        dbo.${tableName} I
    WHERE
        I.INTEGR_REC_BATCHREF = @BatchRef`

const tablesAndColumns = JSON.parse(fs.readFileSync('./data/StagingTablesColumns.json'))

let output = ''

output += bigBanner("Map staging columns", tab(1)) + '\n\n'

for(const table of tablesAndColumns)
{
    output += banner(table.entityName, tab(1)) + '\n\n'

    for(const columnName of table.columns)
    {
        output += banner(columnName, tab(1))
        output += getUpdateStatement(table.name, columnName) + '\n\n'
    }
}

fs.writeFileSync(
    `./output/Transform.sql`,
    output
)