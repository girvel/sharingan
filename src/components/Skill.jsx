import './Skill.css';
import {max, median} from "../toolkit/statistics.js";
import {useState} from "react";
import IndicatorValue from "./IndicatorValue.jsx";

export default function Skill({data, data_index}) {
  let [_data, setData] = useState(data);

  let {level_name, limit} = _data.levels.find(l => l.level === _data.user_level);

  let sets_amounts = _data.sets.filter(s => s.level == _data.user_level).map(s => s.amount)

  let norm = median(sets_amounts, 0);
  let maximum = max(sets_amounts, 0);
  let total_amount = sets_amounts.reduce((sum, a) => sum + Number(a), 0);

  function onClick(event) {
    const value = event.target.closest(".indicator_value");
    if (!value) return;

    setData({
      ..._data,
      sets: [..._data.sets, {
        exercise: _data.exercise,
        amount: Number(value.getAttribute("data-amount")),
        level: _data.user_level,
      }]
    });
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
      <td>
        <span onClick={onClick}>
          [
          {indicator_value}
          ]
        </span>
      </td>
      <td>
        ({norm}/{limit})
      </td>
      <td>
        <span className="dim">{total_amount}</span>
      </td>
    </tr>
  );
}