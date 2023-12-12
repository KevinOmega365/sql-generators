export const getValueByJsonPath = (obj, jsonPath) => {
    if (jsonPath === '$') {
        return obj
    }

    const pathParts = jsonPath.split('.').slice(1)

    return pathParts.reduce((currentObj, part) => {
        if (currentObj && part.includes('[')) {
            // Array dereferencing with brackets
            const key = part.split('[')[0]
            const arrayIndex = parseInt(part.match(/\d+/)[0], 10)
            return currentObj[key][arrayIndex]
        } else {
            return currentObj ? currentObj[part] : undefined
        }
    }, obj)
}
