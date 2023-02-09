import './Skill.css'
import {max, median} from "../toolkit/statistics.js";
import {useState} from "react";
import {log} from "../toolkit/stuff.js";

export default function Skill({data, data_index}) {
  let [_data, setData] = useState(data);

  let {level_name, limit} = _data.levels.find(l => l.level === _data.user_level);

  let sets_amounts = _data.sets.filter(s => s.level == _data.user_level).map(s => s.amount)

  let normal = median(sets_amounts, 0);
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
    ...Array.from({length: normal}, (_, i) =>
      <span key={i} data-amount={log(i + 1)} className="tui normal_piece indicator_value">|</span>
    ),
    ...Array.from({length: maximum - normal}, (_, i) =>
      <span key={normal + i} data-amount={log(normal + i + 1)} className="tui maximum_piece indicator_value">|</span>
    ),
    ...Array.from({length: limit - maximum}, (_, i) =>
      <span key={maximum + i} data-amount={log(maximum + i + 1)} className="tui indicator_value"> </span>
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
      <td>
        <span className="dim">{total_amount}</span>
      </td>
    </tr>
  );
}