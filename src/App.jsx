import { useState } from "react";
import "./App.scss";
import Card from "./components/Card";
import { arrayOfPeople } from "./tools/people.tools";
import DeepSearch from "./components/DeepSearch";

// si différents objets ont les même clés, il faut pouvoir choisir l'objet dans lequel chercher
// tests de régression

function App() {
  const [people] = useState(arrayOfPeople);
  const [includedKeys, setIncludedKeys] = useState(["city"]);
  const [excludedKeys, setExcludedKeys] = useState(["lastname"]);
  const [sortOptions, setSortOptions] = useState(["firstname", "lastname"]);

  return (
    <main>
      <DeepSearch
        arrayToSearch={people}
        excludedKeys={excludedKeys}
        includedKeys={includedKeys}
        sortOptions={sortOptions}
        renderMappedItem={(element) => {
          return <Card person={element} key={element.id} />;
        }}
      />
    </main>
  );
}

export default App;

