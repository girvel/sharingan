import './Skill.css'

export default function Skill({ 
  name, level, normal, maximum, limit
}) {
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
    <tr className="skill">
      <td>
        {name}:
      </td>
      <td>
        lvl. {level}
      </td>
      <td className="indicator">
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