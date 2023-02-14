import {group} from "./statistics.js";
import {Data} from "dataclass";
import {inDevelopmentMode} from "./stuff.js";

const server_url = "http://" + (inDevelopmentMode() ? "localhost:8000" : "aws.girvel.xyz");

async function post(call, args) {
  const response = await fetch(`${server_url}/${call}/`, {
    method: 'POST',  // TODO make it GET?
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(args),
  });

  if (response.ok) {
    return await response.json();
  }

  console.error(`HTTP error ${response.status}: ${response.statusText}`);
  return Promise.reject();
}

class DbRawData extends Data { levels; sets; user_levels; }

export async function fetchUserData(username) {
  return DbRawData.create(await post("user_data", {user: username}))
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

export async function pushExerciseSet(username, set) {
  return post("exercise_set", {user: username, ...set})
}