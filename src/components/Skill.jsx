import './Skill.css'

export default function Skill({ 
  name, level, normal, maximum, limit
}) {
  console.log(name, level, normal, maximum, limit);

  const pieces = {
    first: normal,
    second: maximum - normal,
    third: limit - maximum
  };

  return (
    <div>
      {name}: lvl. {level} 
      <span className="indicator">
        [
        <span className="indicator_value bright">{"|".repeat(pieces.first)}</span>
        <span className="indicator_value dim">{"|".repeat(pieces.second)}</span>
        <span className="indicator_value">{" ".repeat(pieces.third)}</span>
        ]
        ({normal}/{limit})
      </span>  
    </div>
  );
}