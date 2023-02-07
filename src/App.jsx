import './App.css'
import Skill from "./components/Skill"

function group(array, selector) {
  let result = new Map();

  array.forEach(item => {
    const category = selector(item);
    if (!result.get(category)) result.set(category, []);
    result.get(category).push(item);
  })

  return result;
}

function median(array) {
  return array[Math.floor(array.length / 2)];
}

function App() {
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

  // TODO select last exercises for time period / last N
  let skills = Array.from(group(exercises, ({exercise}) => exercise))
    .map(([name, data]) => ({
      name: name,
      normal: median(data.map(e => e.amount)),
      maximum: Math.max(...data.map(e => e.amount))
    }))
    .map(obj => {
      obj.level_object = levels.find(({exercise, limit}) => (exercise === obj.name && obj.normal < limit));
      return obj;
    })
    .map(({name, normal, maximum, level_object}, i) => (
      <Skill key={i} name={name} normal={normal} maximum={maximum}
             level={level_object.level} limit={level_object.limit} />
    ));

  return (
    <>
      <h1>Sharingan</h1>
      <div>
        {skills}
      </div>
    </>
  );
}

export default App;
