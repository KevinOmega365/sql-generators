const getType = (value) => {
    switch(typeof value) {
        case 'string': return 'NVARCHAR(MAX)'
        case 'number': return Number.isInteger(value) ? 'INT' : 'FLOAT'
        default: return 'NVARCHAR(MAX)' // debug: typeof value
    }
}

export const getColumnTypes = (obj) => {
  let types = []

  if(Array.isArray(obj))
  {
    return ['array']
  }

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]

      if (typeof value === 'object' && value !== null) {
        // Recursive call for nested objects
        types = types.concat(getColumnTypes(value))
      } else {
        types.push(getType(value))
      }
    }
  }

  return types
}