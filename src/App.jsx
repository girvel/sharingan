import './App.css'
import Skill from "./components/Skill"
import {group, median} from "./toolkit/statistics.js";

function fetch_data_from_db() {
  const exercises = [
    {exercise: "Push-ups", amount: 10},
    {exercise: "Push-ups", amount: 10},
    {exercise: "Push-ups", amount: 12},
    {exercise: "Knee raises", amount: 20},
    {exercise: "Knee raises", amount: 20},
    {exercise: "Knee raises", amount: 28},
  ];

  const levels = [
    {exercise: "Push-ups", level: 1, limit: 30},
    {exercise: "Knee raises", level: 1, limit: 30}
  ];

  return {exercises: exercises, levels: levels};
}

function calculate_statistics(exercises, levels) {
  // TODO select last exercises for time period / last N
  return Array.from(group(exercises, ({exercise}) => exercise))
    .map(([name, data]) => ({
      name: name,
      normal: median(data.map(e => e.amount)),
      maximum: Math.max(...data.map(e => e.amount))
    }))
    .map(obj => {
      const level_object = levels.find(({exercise, limit}) => (exercise === obj.name && obj.normal < limit));
      obj.level = level_object.level;
      obj.limit = level_object.limit;
      return obj;
    });
}

function App() {
  function onMouseOver(event) {
    const tr = event.target.closest("tr");
    if (!tr) return;

    tr.querySelectorAll("td:not(.indicator)").forEach(e => e.classList.add("selected"));
  }

  function onMouseOut(event) {
    const tr = event.target.closest("tr");
    if (!tr) return;

    tr.querySelectorAll("td:not(.indicator)").forEach(e => e.classList.remove("selected"));
  }

  let {exercises, levels} = fetch_data_from_db();

  let skills = calculate_statistics(exercises, levels)
    .map(({name, normal, maximum, limit, level}, i) => (
      <Skill key={i} name={name} normal={normal} maximum={maximum}
             level={level} limit={limit}
      />
    ));

  return (
    <>
      <h1>Sharingan</h1>
      <div>
        <table onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
          <tbody>
            {skills}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
