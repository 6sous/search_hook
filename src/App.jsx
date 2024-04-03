import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import { arrayOfPeople } from "./tools/people.tools";
import DeepSearch from "./components/DeepSearch";

function App() {
  const [people] = useState(arrayOfPeople);
  const [includedKeys, setIncludedKeys] = useState([
    "firstname",
    "lastname",
    "description",
  ]);
  const [excludedKeys, setExcludedKeys] = useState(null);
  const [sortOptions, setSortOptions] = useState(["city"]);

  return (
    <>
      <DeepSearch
        arrayToSearch={people}
        ExcludedKeys={excludedKeys}
        IncludedKeys={includedKeys}
        sortOptions={sortOptions}
        renderMappedItem={(element) => (
          <Card person={element} key={element.id} />
        )}
      />
    </>
  );
}

export default App;

