import './Skill.css'
import {median} from "../toolkit/statistics.js";
import {useState} from "react";

export default function Skill({data, data_index}) {
  let [_data, setData] = useState(data);

  let {level_name, limit} = _data.levels.find(l => l.level === _data.user_level);

  let [normal, maximum] = _data.sets.length === 0 ? [0, 0] : [
    median(_data.sets.map(s => s.amount)),
    Math.max(..._data.sets.map(s => s.amount)),
  ]

  function onClick(event) {
    const value = event.target.closest(".indicator_value");
    if (!value) return;

    setData({
      ..._data,
      sets: [..._data.sets, {
        exercise: _data.exercise,
        amount: value.getAttribute("data-amount"),
        level: _data.user_level,
      }]
    });
  }

  const indicator_value = [
    ...Array.from({length: normal}, (_, i) =>
      <span key={i} data-amount={i + 1} className="tui normal_piece indicator_value">|</span>
    ),
    ...Array.from({length: maximum - normal}, (_, i) =>
      <span key={normal + i} data-amount={normal + i + 1} className="tui maximum_piece indicator_value">|</span>
    ),
    ...Array.from({length: limit - maximum}, (_, i) =>
      <span key={maximum + i} data-amount={maximum + i + 1} className="tui indicator_value"> </span>
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
        ({normal}/{limit})
      </td>
    </tr>
  );
}