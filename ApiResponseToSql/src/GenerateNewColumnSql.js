const getType = (column) =>
{
    if(!column.type) return 'nvarchar(max)'

    if(!column.length) return column.type

    return `${column.type}(${column.length})`
}

const getAlterTableStatement = (tableName) => (column) => `
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${tableName}' AND COLUMN_NAME = '${column.name}')
BEGIN
    ALTER TABLE ${tableName} ADD [${column.name}] ${getType(column)} NULL;
END;`

export const generateNewColumnSql = (columnDefinitions) =>
{
    const {
        destinationTable,
        columns
    } = columnDefinitions
    
    return columns.map(getAlterTableStatement(destinationTable))
}