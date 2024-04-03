import { useState } from "react";
import { useSearchEngine } from "../hooks/useSearchEngine";

function DeepSearch({
  arrayToSearch,
  IncludedKeys = null,
  ExcludedKeys = null,
  sortOptions = null,
  renderMappedItem,
  labelName,
  className = "deep-search-content",
  placeholder = "rechercher",
}) {
  const [searchValue, setSearchValue] = useState("");

  const { sortedArray } = useSearchEngine(
    searchValue,
    arrayToSearch,
    IncludedKeys,
    ExcludedKeys,
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
