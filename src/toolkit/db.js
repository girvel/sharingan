import {group} from "./statistics.js";
import {Data} from "dataclass";

export function fetchDataFromDb() {
  const sets = [
    {exercise: "Push-ups", amount: 10, level: 1},
  ];

  const all_levels = [
    {exercise: "Push-ups", level: 1, level_name: "Normal", limit: 30},
    {exercise: "Leg raises", level: 1, level_name: "Knee raises", limit: 30}
  ];

  const user_levels = [
    {exercise: "Push-ups", level: 1},
  ]

  return {sets: sets, all_levels: all_levels, user_levels: user_levels};
}

class SkillData extends Data { exercise; levels; user_level; sets; }

export function groupDataBySkills(data) {
  const sets_grouped = group(data.sets, s => s.exercise);
  return Array.from(group(data.all_levels, l => l.exercise)).map(([exercise, levels]) => SkillData.create({
    exercise: exercise,
    levels: levels,
    user_level: data.user_levels.find(ul => ul.exercise === exercise)?.level ?? 1,
    sets: sets_grouped.get(exercise) ?? [],
  }));
}