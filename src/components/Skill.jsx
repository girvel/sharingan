import './Skill.css'

export default function Skill({ 
  name, level, average, maximum, limit
}) {
  const pieces = {
    first: average,
    second: maximum - average,
    third: limit - maximum
  };

  return (
    <div>
      {name}: lvl. {level} 
      <span class="indicator">
        [
        <span class="indicator_value bright">{"|".repeat(pieces.first)}</span>
        <span class="indicator_value dim">{"|".repeat(pieces.second)}</span>
        <span class="indicator_value">{" ".repeat(pieces.third)}</span>
        ]
      </span>  
    </div>
  );
}