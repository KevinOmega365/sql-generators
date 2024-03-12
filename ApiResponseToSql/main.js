import fs from 'fs'
import { getValueByJsonPath } from './lib/GetValueByJsonPath.js'
import { getColumnNames } from './lib/GetColumnNames.js'
import { getColumnTypes } from './lib/GetColumnTypes.js'
import { getJsonPaths } from './lib/GetJsonPaths.js'
import { generateTransformProcedure } from './lib/GenerateTransformProcedure.js'
import { generateAlignDataModelProcedure } from './lib/GenerateAlignDataModelProcedure.js'

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
        dataRootPath,
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