import { useState } from "react";
import "./App.scss";
import Card from "./components/Card";
import { arrayOfPeople } from "./tools/people.tools";
import DeepSearch from "./components/DeepSearch";

function App() {
  const [people] = useState(arrayOfPeople);
  const [includedKeys] = useState(["city"]);
  const [excludedKeys] = useState(["billingAddress"]);
  const [sortOptions] = useState(["country", "lastname"]);

  return (
    <main>
      <DeepSearch
        arrayToSearch={people}
        excludedKeys={excludedKeys}
        includedKeys={includedKeys}
        sortOptions={sortOptions}
        renderMappedItem={(element) => {
          console.log(element.address.country);
          return <Card person={element} key={element.id} />;
        }}
      />
    </main>
  );
}

export default App;

