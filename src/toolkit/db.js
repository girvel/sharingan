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