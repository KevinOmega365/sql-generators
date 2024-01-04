export const getColumnNames = (obj) => recurse(obj)
  .map(name => name.replace(/\_value/, ''))
  .map(name => name.replace(/\_\_/, '_'))
  .map(name => name.replace(/^\_/, ''))

const recurse = (obj, currentName = '') => {
  let names = []

  if(Array.isArray(obj))
  {
    return [currentName + '_STRUCTURED']
  }

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      const name = `${currentName}_${key}`

      if (typeof value === 'object' && value !== null) {
        // Recursive call for nested objects
        names = names.concat(recurse(value, name))
      } else {
        names.push(name)
      }
    }
  }

  return names
}
