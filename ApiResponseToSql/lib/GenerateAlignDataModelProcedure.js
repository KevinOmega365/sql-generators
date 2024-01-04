import { generateNewColumnSql } from './GenerateNewColumnSql.js'
import { banner, bigBanner, tab, tabIn } from "./TextBannersAndTabs.js"

const procedureTop = (namespace) =>
{
    return `CREATE OR ALTER PROCEDURE [dbo].[lstp_Import_${namespace}_AlignDataModel] (
    @GroupRef UNIQUEIDENTIFIER, -- Used to tag records and log entries with the PrimKey of the group (INTEGR_REC_GROUPREF)
    @TaskRef UNIQUEIDENTIFIER,  -- Used to tag records and log entries with the PrimKey of the current group-task
    @BatchRef UNIQUEIDENTIFIER  -- Used to tag all records and log entries across a group execution run (INTEGR_REC_BATCHREF)
)
AS
BEGIN`
}

const addColumns = (columnDefinitions) =>
{
    const { entityName } = columnDefinitions

    return [
        bigBanner(entityName, tab(1)),
        '',
        banner('JSON Unpacking', tab(1)),
        generateNewColumnSql(columnDefinitions)
            .map(statement => statement.split('\n'))
            .map(lines => lines.map(tabIn(1)))
            .map(lines => lines.join('\n'))
    ]
        .flat()
        .join('\n') +
        '\n'
}

export const generateAlignDataModelProcedure = (importNamespace, tablesColumns) =>
{
    return [
        procedureTop(importNamespace),
        '',
        tablesColumns.map(addColumns),
        'END'
    ]
        .flat()
        .join('\n')
}
