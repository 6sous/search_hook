/**
 * Custom hook for searching through an array of objects based on specified keys,
 * allowing inclusion or exclusion of certain keys.
 *
 * @param {string} value - The search value.
 * @param {Array} array - The array of objects to search through.
 * @param {string[] || null} includedKeys - Array of keys to include in the search.
 * @param {string[] || null} excludedKeys - Array of keys to exclude from the search.
 * @returns {Object} - Returns an object containing the filtered array based on the search criteria.
 */

export const useSearchEngine = (
  value,
  array,
  includedKeys = null,
  excludedKeys = null
) => {
  const filteredValuesByExcludingKeys = (obj, value) => {
    const keys = Object.keys(obj);

    return keys.some((key) => {
      if (typeof obj[key] === "object") {
        return filteredValuesByExcludingKeys(obj[key], value);
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

  const finalFilteredArray = array
    .filter((avatar) => filteredValuesByExcludingKeys(avatar, value))
    .toSorted((a, b) => {
      if (a.firstname !== b.firstname) {
        return a.firstname.localeCompare(b.firstname);
      } else {
        return a.lastname.localeCompare(b.lastname);
      }
    });

  return { finalFilteredArray };
};
