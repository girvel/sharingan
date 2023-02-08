import './App.css'
import Skill from "./components/Skill"
import {group} from "./toolkit/statistics.js";
import {useState} from "react";
import {fetchDataFromDb} from "./toolkit/db.js";


// should return [{exercise, levels, user_level, sets}]
function groupDataBySkills(data) {
  const sets_grouped = group(data.sets, s => s.exercise);
  return Array.from(group(data.all_levels, l => l.exercise)).map(([exercise, levels]) => {
    return {
      exercise: exercise,
      levels: levels,
      user_level: data.user_levels.find(ul => ul.exercise === exercise)?.level ?? 1,
      sets: sets_grouped.get(exercise) ?? [],
    };
  });
}

let grouped_skill_data = groupDataBySkills(fetchDataFromDb());

let skills = grouped_skill_data.map((data, i) => <Skill key={i} data={data} />);


function App() {
  const [selected, setSelected] = useState(null);

  function selectSkill(skill) {
    if (selected) {
      selected.querySelector("td.indicator").classList.remove("selected");
    }

    setSelected(skill);
    if (!skill) return;

    skill.querySelector("td.indicator").classList.add("selected");
  }

  function onMouseOver(event) {
    const tr = event.target.closest("tr.skill");
    if (!tr) return;

    tr.querySelectorAll("td:not(.indicator)").forEach(e => e.classList.add("highlighted"));
  }

  function onMouseOut(event) {
    const tr = event.target.closest("tr.skill");
    if (!tr) return;

    tr.querySelectorAll("td:not(.indicator)").forEach(e => e.classList.remove("highlighted"));
  }

  function onClick(event) {
    const tr = event.target.closest("tr.skill");
    if (!tr) return;

    selectSkill(tr);
  }

  document.onclick = (event) => {
    console.log(1);
    const tr = event.target.closest("tr.skill");
    if (tr) return;

    selectSkill(null);
  }

  return (
    <>
      <h1>Sharingan</h1>
      <div>
        <table className="hidden_table" onMouseOver={onMouseOver} onMouseOut={onMouseOut} onClick={onClick}>
          <tbody>
            {skills}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
