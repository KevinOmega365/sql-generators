import fs from 'fs'
import { getValueByJsonPath } from './src/GetValueByJsonPath.js'
import { getColumnNames } from './src/GetColumnNames.js'
import { getColumnTypes } from './src/GetColumnTypes.js'
import { getJsonPaths } from './src/GetJsonPaths.js'

const config = JSON.parse(fs.readFileSync('./config.json'))

const {
    sampleDataJsonFilePath,
    dataRootPath,
    destinationTable,
    rawImportTable,
    entityName
} = config[0]

const sampleData = JSON.parse(fs.readFileSync(sampleDataJsonFilePath))

const model = getValueByJsonPath(sampleData, dataRootPath)

const columnNames = getColumnNames(model)
const columnTypes = getColumnTypes(model)
const columnDataPaths = getJsonPaths(model)

const tableColumns = {
    name: destinationTable,
    columns: columnNames.map((name, i) =>
    ({
        name,
        type: columnTypes[i],
        path: columnDataPaths[i]
    }))
}
console.log(tableColumns)