import './Skill.css'
import {median} from "../toolkit/statistics.js";

export default function Skill({data, data_index, selected}) {
  let {level_name, limit} = data.levels.find(l => l.level === data.user_level);

  let [normal, maximum] = data.sets.length === 0 ? [0, 0] : [
    median(data.sets.map(s => s.amount)),
    Math.max(...data.sets.map(s => s.amount)),
  ]

  const indicator_value = [
    ...Array(normal).fill(0).map((_, i) =>
      <span key={i} data-amount={i + 1} className="tui normal_piece indicator_value">|</span>
    ),
    ...Array(maximum - normal).fill(0).map((_, i) =>
      <span key={normal + i} data-amount={normal + i + 1} className="tui maximum_piece indicator_value">|</span>
    ),
    ...Array(limit - maximum).fill(0).map((_, i) =>
      <span key={maximum + i} data-amount={maximum + i + 1} className="tui indicator_value"> </span>
    ),
  ];

  return (
    <tr className="skill" data-index={data_index}>
      <td>
        {data.exercise}:
      </td>
      <td>
        lvl. {data.user_level}, {level_name}
      </td>
      <td className={"indicator" + (selected ? " selected" : "")}>
        <span>
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