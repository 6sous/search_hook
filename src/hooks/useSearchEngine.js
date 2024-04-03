/**
 * Custom hook for searching through an array of objects based on specified keys,
 * allowing inclusion or exclusion of certain keys and sorting options to be specified.
 *
 * @param {string} value - The search value.
 * @param {Array} array - The array of objects to search through.
 * @param {string[] || null} includedKeys - Array of keys to include in the search.
 * @param {string[] || null} excludedKeys - Array of keys to exclude from the search.
 * @param {string[] || null} sortOptions - Array of keys to sort the search results by.
 * @returns {Object} - Returns an object containing the filtered array based on the search criteria.
 */

export const useSearchEngine = (
  value,
  array,
  includedKeys = null,
  excludedKeys = null,
  sortOptions
) => {
  const filteredValuesByKeys = (obj, value) => {
    const keys = Object.keys(obj);

    return keys.some((key) => {
      if (typeof obj[key] === "object") {
        return filteredValuesByKeys(obj[key], value);
      } else {
        const searchedValues = obj[key]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());

        return excludedKeys
          ? !excludedKeys.includes(key) && searchedValues
          : includedKeys
          ? includedKeys.includes(key) && searchedValues
          : searchedValues;
      }
    });
  };

  const filteredArray = array.filter((avatar) =>
    filteredValuesByKeys(avatar, value)
  );

  const sortedArray = filteredArray.toSorted((a, b) => {
    const searchPropertyInObject = (obj1, obj2) => {
      let sort = 0;
      for (let i = 0; i < sortOptions.length; i++) {
        const option = sortOptions[i];
        if (obj1.hasOwnProperty(option) && obj2.hasOwnProperty(option)) {
          sort = obj1[option].localeCompare(obj2[option]);
          if (sort !== 0) {
            return sort;
          }
        } else {
          for (const key of Object.keys(obj1)) {
            if (
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
    return sortOptions && searchPropertyInObject(a, b);
  });

  return { sortedArray };
};
