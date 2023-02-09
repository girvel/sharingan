import './App.css'
import Skill from "./components/Skill"
import {useState} from "react";
import {fetchDataFromDb, groupDataBySkills} from "./toolkit/db.js";


let grouped_skill_data = groupDataBySkills(fetchDataFromDb());


function App() {
  const [selected, setSelected] = useState(null);

  function onClick(event) {
    const tr = event.target.closest("tr.skill");
    if (!tr) return;

    setSelected(tr.getAttribute("data-index"));
  }

  document.onclick = (event) => {
    const tr = event.target.closest("tr.skill");
    if (tr) return;

    setSelected(null);
  }

  let skills = grouped_skill_data.map((data, i) =>
    <Skill key={i} data={data} data_index={i} selected={selected == i} />
  );

  return (
    <>
      <h1>Sharingan</h1>
      <div>
        <table className="hidden_table" onClick={onClick}>
          <tbody>
            {skills}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
