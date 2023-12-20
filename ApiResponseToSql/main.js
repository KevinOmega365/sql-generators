import fs from 'fs'
import { getValueByJsonPath } from './src/GetValueByJsonPath.js'
import { getColumnNames } from './src/GetColumnNames.js'
import { getColumnTypes } from './src/GetColumnTypes.js'
import { getJsonPaths } from './src/GetJsonPaths.js'
import { generateTransformProcedure } from './src/GenerateTransformProcedure.js'
import { generateAlignDataModelProcedure } from './src/GenerateAlignDataModelProcedure.js'

const config = JSON.parse(fs.readFileSync('./config.json'))

const allTablesAndColumns = []

const importNamespace = config.importNamespace

for(const endPointConfiguration of config.endpointConfigurations)
{
    const {
        sampleDataJsonFilePath,
        dataRootPath,
        destinationTable,
        rawImportTable,
        entityName
    } = endPointConfiguration

    const sampleData = JSON.parse(fs.readFileSync(sampleDataJsonFilePath))
    
    const model = getValueByJsonPath(sampleData, dataRootPath + '[0]') // take the first example
    
    const columnNames = getColumnNames(model)
    const columnTypes = getColumnTypes(model)
    const columnDataPaths = getJsonPaths(model)
    
    const tableColumns = {
        destinationTable,
        rawImportTable,
        entityName,
        columns: columnNames.map((name, i) =>
        ({
            name,
            dataRootPath,
            type: columnTypes[i],
            path: columnDataPaths[i]
        }))
    }

    fs.writeFileSync(
        `./output/${entityName}TableColumns.json`,
        JSON.stringify(tableColumns, null, 4)
    )

    allTablesAndColumns.push(tableColumns)
}

////////////////////////////////////////////////////////////////////////////////

fs.writeFileSync(
    `./output/lstp_Import_${importNamespace}_Transform.sql`,
    generateTransformProcedure(importNamespace, allTablesAndColumns)
)

////////////////////////////////////////////////////////////////////////////////

fs.writeFileSync(
    `./output/lstp_Import_${importNamespace}_AlignDataModel.sql`,
    generateAlignDataModelProcedure(importNamespace, allTablesAndColumns)
)

////////////////////////////////////////////////////////////////////////////////

console.log('Ok.')