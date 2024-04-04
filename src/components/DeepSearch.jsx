import { useState } from "react";
import { searchEngine } from "../utils/searchEngine";

function DeepSearch({
  arrayToSearch,
  includedKeys = null,
  excludedKeys = null,
  sortOptions = null,
  renderMappedItem,
  labelName,
  className = "deep-search-content",
  placeholder = "rechercher",
}) {
  const [searchValue, setSearchValue] = useState("");

  const { sortedArray } = searchEngine(
    searchValue,
    arrayToSearch,
    includedKeys,
    excludedKeys,
    sortOptions
  );

  return (
    <>
      <label htmlFor="search" className="label-input">
        {labelName}
        <input
          id="search"
          name="search"
          value={searchValue}
          type="search"
          placeholder={placeholder}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
      </label>
      <div className={className}>
        {sortedArray.map((element) => {
          return renderMappedItem(element);
        })}
      </div>
    </>
  );
}

export default DeepSearch;
