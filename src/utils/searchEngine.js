export function includeFn(includedKeys, excludedKeys) {
  return (key, value) => {
    if (excludedKeys?.length && excludedKeys.includes(key)) {
      return false;
    }
    if (typeof value === "object") return true;

    if (includedKeys?.length && !includedKeys.includes(key)) {
      return false;
    }
    return true;
  };
}

export function insensitiveSearch(value, searchValue) {
  return value.toString().toLowerCase().includes(searchValue.toLowerCase());
}

export const filterValuesByKeys = (
  obj,
  searchValue,
  includedKeys,
  excludedKeys
) => {
  const include = includeFn(includedKeys, excludedKeys);

  if (obj === null || typeof obj !== "object") {
    return false;
  }

  return Object.entries(obj).some(([key, value]) => {
    if (!include(key, value)) {
      return false;
    }
    if (typeof value === "object") {
      return filterValuesByKeys(value, searchValue, includedKeys, excludedKeys);
    }
    if (typeof value !== "string" && typeof value !== "number") {
      return false;
    }
    return insensitiveSearch(value, searchValue);
  });
};

/**
 * function for searching through an array of objects based on specified keys,
 * allowing inclusion or exclusion of certain keys and sorting options to be specified.
 *
 * @param {string} value - The search value.
 * @param {Array} array - The array of objects to search through.
 * @param {string[] || null} includedKeys - Array of keys to include in the search.
 * @param {string[] || null} excludedKeys - Array of keys to exclude from the search.
 * @param {string[] || null} sortOptions - Array of keys to sort the search results by.
 * @returns {Object} - Returns an object containing the filtered array based on the search criteria.
 */

export const searchEngine = (
  value,
  array,
  includedKeys,
  excludedKeys,
  sortOptions
) => {
  const filteredArray = array.filter((element) =>
    filterValuesByKeys(element, value, includedKeys, excludedKeys)
  );

  const searchPropertyInObject = (obj1, obj2) => {
    let sort = 0;
    for (let i = 0; i < sortOptions.length; i++) {
      const option = sortOptions[i];
      if (
        Object.hasOwnProperty.call(obj1, option) &&
        Object.hasOwnProperty.call(obj2, option)
      ) {
        sort = obj1[option].localeCompare(obj2[option]);
        if (sort !== 0) {
          return sort;
        }
      } else {
        for (const key of Object.keys(obj1)) {
          if (
            obj1[key] !== null &&
            obj2[key] !== null &&
            typeof obj1[key] === "object" &&
            typeof obj2[key] === "object"
          ) {
            sort = searchPropertyInObject(obj1[key], obj2[key]);
            if (sort !== 0) {
              return sort;
            }
          }
        }
      }
    }
    return sort;
  };

  const sortedArray = sortOptions
    ? filteredArray.sort((a, b) => {
        return searchPropertyInObject(a, b);
      })
    : filteredArray;

  return { sortedArray };
};
