
const jsonQueryStatment = (column) => `json_query(value, '${column.path}')`
const jsonValueStatment = (column) => `json_value(value, '${column.path}')`

const coalescedJsonExtractionForUnknownKeyValues = (column) =>
    `coalesce(${jsonQueryStatment(column)}, ${jsonValueStatment(column)})`

const getColumnValueExtraction = (column) =>
    `${column.name} = ${coalescedJsonExtractionForUnknownKeyValues(column)})`

export const generateUnpackSql = (columns) =>
    columns.map(getColumnValueExtraction)
