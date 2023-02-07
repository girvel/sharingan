import './Skill.css'

export default function Skill({ 
  name, level, normal, maximum, limit
}) {
  const pieces = {
    first: normal,
    second: maximum - normal,
    third: limit - maximum
  };

  return (
    <tr>
      <td>
        {name}: lvl. {level}
      </td>
      <td className="indicator">
        <span>
          [
          <span className="tui bright">{"|".repeat(pieces.first)}</span>
          <span className="tui dim">{"|".repeat(pieces.second)}</span>
          <span className="tui">{" ".repeat(pieces.third)}</span>
          ]
        </span>
      </td>
      <td>
        ({normal}/{limit})
      </td>
    </tr>
  );
}