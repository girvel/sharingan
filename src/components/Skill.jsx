import './Skill.css';
import {max, median} from "../toolkit/statistics.js";
import {useState} from "react";
import {pushExerciseSet} from "../toolkit/db.js";
import CountedInteractiveBar from "./CountedInteractiveBar.jsx";


export default function Skill({data, username}) {
  let [_data, setData] = useState(data);


  function onBarClick(event, amount) {
    const set_to_add = {
      exercise: _data.exercise,
      amount: amount,
      level: _data.user_level,
    };

    pushExerciseSet(username, set_to_add).then(() => {
      setData({..._data,
        sets: [..._data.sets, set_to_add]
      })
    })
  }


  let {level_name, limit} = _data.levels.find(l => l.level === _data.user_level);

  let sets_amounts = _data.sets.filter(s => s.level == _data.user_level).map(s => s.amount)

  let norm = median(sets_amounts.slice(-5), 0);
  let maximum = max(sets_amounts, 0);
  let total_amount = sets_amounts.reduce((sum, a) => sum + a, 0);

  if (norm >= limit && _data.user_level < max(_data.levels.map(l => l.level), 0)) {
    setData({..._data, user_level: _data.user_level + 1});
  }

  return (
    <tr className="skill">
      <td>
        {_data.exercise}:
      </td>
      <td>
        lvl. {_data.user_level}, {level_name}
      </td>
      <CountedInteractiveBar value={norm} dim_value={maximum} length={limit} onClick={onBarClick} />
      <td>
        <span className="dim">{total_amount}</span>
      </td>
    </tr>
  );
}