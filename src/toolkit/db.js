import {group} from "./statistics.js";
import {Data} from "dataclass";

class DbRawData extends Data { levels; sets; user_levels; }

export async function fetchDataFromDb() {
  const response = await fetch("http://localhost:8000/user_data/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: "girvel",
    }),
  });

  if (response.ok) {
    return DbRawData.create(await response.json());
  }

  console.error(`HTTP error ${response.status}: ${response.statusText}`);
}

class SkillData extends Data { exercise; levels; user_level; sets; }

export function groupDataBySkills(data) {
  const sets_grouped = group(data.sets, s => s.exercise);
  return Array.from(group(data.levels, l => l.exercise)).map(([exercise, levels]) => SkillData.create({
    exercise: exercise,
    levels: levels,
    user_level: data.user_levels.find(ul => ul.exercise === exercise)?.level ?? 1,
    sets: sets_grouped.get(exercise) ?? [],
  }));
}