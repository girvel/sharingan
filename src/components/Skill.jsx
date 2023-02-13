import './Skill.css';
import {max, median} from "../toolkit/statistics.js";
import {useState} from "react";
import IndicatorValue from "./IndicatorValue.jsx";
import {pushExerciseSet} from "../toolkit/db.js";

export default function Skill({data, data_index}) {
  let [_data, set_data] = useState(data);
  let [counterOverride, setCounterOverride] = useState(null);


  function onClick(event) {
    const value = event.target.closest(".indicator_value");
    if (!value) return;

    const set_to_add = {
      exercise: _data.exercise,
      amount: Number(value.getAttribute("data-amount")),
      level: _data.user_level,
    };

    pushExerciseSet(set_to_add).then(() => {
      set_data({
        ..._data,
        sets: [..._data.sets, set_to_add]
      });
    })
  }

  function onMouseOverIndicator(event) {
    const value = event.target.closest(".indicator_value");
    if (!value) return;
    setCounterOverride(Number(value.getAttribute("data-amount")));
  }

  function onMouseOutIndicator(event) {
    console.log(event.target);
    if (!event.target.closest(".indicator")) return;
    setCounterOverride(null);
  }


  let {level_name, limit} = _data.levels.find(l => l.level === _data.user_level);

  let sets_amounts = _data.sets.filter(s => s.level == _data.user_level).map(s => s.amount)

  let norm = median(sets_amounts.slice(-5), 0);
  let maximum = max(sets_amounts, 0);
  let total_amount = sets_amounts.reduce((sum, a) => sum + Number(a), 0);  // TODO remove number?

  const indicator_value = [
    ...Array.from({length: norm}, (_, i) =>
      <IndicatorValue key={i} amount={i + 1} kind="norm" />
    ),
    ...Array.from({length: maximum - norm}, (_, i) =>
      <IndicatorValue key={norm + i} amount={norm + i + 1} kind="maximum" />
    ),
    ...Array.from({length: limit - maximum}, (_, i) =>
      <IndicatorValue key={maximum + i} amount={maximum + i + 1} kind="empty" />
    ),
  ];

  return (
    <tr className="skill" data-index={data_index}>
      <td>
        {_data.exercise}:
      </td>
      <td>
        lvl. {_data.user_level}, {level_name}
      </td>
      <td className="indicator" onMouseOver={onMouseOverIndicator} onMouseOut={onMouseOutIndicator}>
        <span onClick={onClick}>
          [
          {indicator_value}
          ]
        </span>
      </td>
      <td>
        ({counterOverride ?? norm}/{limit})
      </td>
      <td>
        <span className="dim">{total_amount}</span>
      </td>
    </tr>
  );
}