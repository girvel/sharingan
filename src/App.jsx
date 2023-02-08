import './App.css'
import Skill from "./components/Skill"
import {group, median} from "./toolkit/statistics.js";
import {useState} from "react";

function fetchDataFromDb() {
  const sets = [
    {exercise: "Push-ups", amount: 10, level: 1},
  ];

  const all_levels = [
    {exercise: "Push-ups", level: 1, level_name: "Normal", limit: 30},
    {exercise: "Leg raises", level: 1, level_name: "Knee raises", limit: 30}
  ];

  const user_levels = [
    {exercise: "Push-ups", level: 1},
  ]

  return {sets: sets, all_levels: all_levels, user_levels: user_levels};
}

function calculateStatistics(sets, all_levels, user_levels) {
  // TODO select last exercises for time period / last N
  const exercises_statistics = Array.from(group(sets, s => s.exercise))
    .map(([exercise, data]) => ({
      exercise: exercise,
      normal: median(data.map(e => e.amount)),
      maximum: Math.max(...data.map(e => e.amount)),
      max_level: Math.max(...data.map(e => e.level)),
    }));

  return Array.from(group(all_levels, l => l.exercise))
    .map(([exercise, levels]) => {
      const statistics = exercises_statistics.find(s => s.exercise === exercise) ?? {
        exercise: exercise,
        normal: 0,
        maximum: 0,
      };

      const user_level = user_levels.find(ul => ul.exercise === exercise)?.level ?? 1;
      const limit = levels.find(l => l.level === user_level).limit;

      return {
        ...statistics,
        level: user_level,
        limit: limit,
      };
    });
}


let {sets, all_levels, user_levels} = fetchDataFromDb();

let skills = calculateStatistics(sets, all_levels, user_levels)
  .map((s, i) => (
    <Skill key={i} name={s.exercise} normal={s.normal} maximum={s.maximum}
           level={s.level} limit={s.limit}
    />
  ));

console.log(new Date().toISOString());


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
