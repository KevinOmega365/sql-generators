export const getJsonPaths = (jsonObject, currentPath = '$') => {
    let paths = [];

    if(Array.isArray(jsonObject))
    {
      return [currentPath]
    }

    for (const key in jsonObject) {
      if (jsonObject.hasOwnProperty(key)) {
        const value = jsonObject[key];
        const path = `${currentPath}.${key}`;
  
        if (typeof value === 'object' && value !== null) {
          // Recursive call for nested objects
          paths = paths.concat(getJsonPaths(value, path));
        } else {
          paths.push(path);
        }
      }
    }
  
    return paths;
  };
