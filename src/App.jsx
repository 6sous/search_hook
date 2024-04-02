import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Input from "./components/Input";
import { people } from "./tools/people.tools";
import { useSearchEngine } from "./hooks/useSearchEngine";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [persons] = useState(people);
  const includedKeys = ["firstname", "lastname"];
  const excludedKeys = ["image", "description"];

  const { finalFilteredArray } = useSearchEngine(searchValue, persons);

  return (
    <>
      <Input searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="car-list">
        {finalFilteredArray.map((avatar, i) => (
          <Card key={i} person={avatar} />
        ))}
      </div>
    </>
  );
}

export default App;

