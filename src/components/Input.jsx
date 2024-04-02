import "./Input.scss";

function Input({ searchValue, setSearchValue }) {
  return (
    <label htmlFor="search" className="label-input">
      <input
        id="search"
        name="search"
        value={searchValue}
        type="search"
        placeholder="rechercher un contact"
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
    </label>
  );
}

export default Input;
