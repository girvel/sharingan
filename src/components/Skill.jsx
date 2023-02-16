import './Skill.css';
import {max, median} from "../toolkit/statistics.js";
import {useState} from "react";
import IndicatorValue from "./IndicatorValue.jsx";
import {pushExerciseSet} from "../toolkit/db.js";


// TODO remove data_index
export default function Skill({data, data_index, username}) {
  let [_data, setData] = useState(data);
  let [counterOverride, setCounterOverride] = useState(null);


  function onClick(event) {
    const value = event.target.closest(".indicator_value");
    if (!value) return;

    const set_to_add = {
      exercise: _data.exercise,
      amount: Number(value.getAttribute("data-amount")),
      level: _data.user_level,
    };

    pushExerciseSet(username, set_to_add).then(() => {
      _data.sets.push(set_to_add);
      setData(_data);
    })
  }

  function onMouseOverIndicator(event) {
    const value = event.target.closest(".indicator_value");
    if (!value) return;
    setCounterOverride(Number(value.getAttribute("data-amount")));
  }

  function onMouseOutIndicator() {
    setCounterOverride(null);
  }


  let {level_name, limit} = _data.levels.find(l => l.level === _data.user_level);

  let sets_amounts = _data.sets.filter(s => s.level == _data.user_level).map(s => s.amount)

  let norm = median(sets_amounts.slice(-5), 0);
  let maximum = max(sets_amounts, 0);
  let total_amount = sets_amounts.reduce((sum, a) => sum + Number(a), 0);  // TODO remove number?

  if (norm >= limit && _data.user_level < max(_data.levels.map(l => l.level), 0)) {
    setData({..._data, user_level: _data.user_level + 1});
  }

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