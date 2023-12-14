import { generateUnpackSql } from "./GenerateUnpackSql.js"
import { banner, bigBanner, tab, tabIn } from "./TextBannersAndTabs.js"


const procedureTop = (namespace) =>
{
    return `CREATE OR ALTER PROCEDURE [dbo].[lstp_Import_${namespace}_Transform] (
        @GroupRef UNIQUEIDENTIFIER, -- Used to tag records and log entries with the PrimKey of the group (INTEGR_REC_GROUPREF)
        @TaskRef UNIQUEIDENTIFIER,  -- Used to tag records and log entries with the PrimKey of the current group-task
        @BatchRef UNIQUEIDENTIFIER -- Used to tag all records and log entries across a group execution run (INTEGR_REC_BATCHREF)
    )
    
    AS
    BEGIN
    
        SET NOCOUNT ON;
    
        DECLARE @IMPORTED_OK AS NVARCHAR(50) = (SELECT TOP 1 ID FROM dbo.atbl_Integrations_ImportStatuses WITH (NOLOCK) WHERE ID='IMPORTED_OK')
        DECLARE @TRANSFORMED_OK AS NVARCHAR(50) = (SELECT TOP 1 ID FROM dbo.atbl_Integrations_ImportStatuses WITH (NOLOCK) WHERE ID='TRANSFORMED_OK')
    
        IF @BatchRef IS NULL
        BEGIN
            RAISERROR('Parameter BatchRef can not be null',18,1)
            RETURN
        END
    
        IF @GroupRef IS NULL
        BEGIN
            RAISERROR('Parameter GroupRef can not be null',18,1)
            RETURN
        END`
}

////////////////////////////////////////////////////////////////////////////////

const unpackStatement = (columnDefinitions) =>
{
    const {
        destinationTable,
        rawImportTable,
        entityName,
        dataRootPath,
        columns
    } = columnDefinitions

    return [
        banner(entityName, tab(2)),
        [
            `INSERT INTO dbo.${destinationTable}`,
            '(',
        ].map(tabIn(2)),
        columns.map(c => c.name + ',').map(tabIn(3)),
        [
            `${tab(1)}JsonRow,`,
            `${tab(1)}INTEGR_REC_BATCHREF,`,
            `${tab(1)}INTEGR_REC_ERROR,`,
            `${tab(1)}INTEGR_REC_GROUPREF,`,
            `${tab(1)}INTEGR_REC_STATUS,`,
            `${tab(1)}INTEGR_REC_TRACE`,
            ')',
            'SELECT'
        ].map(tabIn(2)),
        generateUnpackSql(columns).map(c => c + ',').map(tabIn(3)),
        [
            `${tab(1)}JsonRow = value,`,
            `${tab(1)}INTEGR_REC_BATCHREF,`,
            `${tab(1)}INTEGR_REC_ERROR,`,
            `${tab(1)}INTEGR_REC_GROUPREF,`,
            `${tab(1)}INTEGR_REC_STATUS,`,
            `${tab(1)}INTEGR_REC_TRACE`,
            'FROM',
            `${tab(1)}dbo.${rawImportTable} with (nolock)`,
            `${tab(1)}CROSS APPLY OPENJSON(JSON_DATA, '${dataRootPath}')`,
            'WHERE',
            `${tab(1)}INTEGR_REC_BATCHREF = @BatchRef`,
        ].map(tabIn(2)),
    ]
        .flat()
        .join('\n') +
        '\n'
}

////////////////////////////////////////////////////////////////////////////////

export const generateTransformProcedure = (namespace, tablesColumns) => {
    return [
        procedureTop(namespace),
        bigBanner('Unpack JSON', tab(2)),
        '',
        tablesColumns.map(unpackStatement),
        'END'
    ]
        .flat()
        .join('\n')
}