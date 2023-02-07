export function group(array, selector) {
  let result = new Map();

  array.forEach(item => {
    const category = selector(item);
    if (!result.get(category)) result.set(category, []);
    result.get(category).push(item);
  })

  return result;
}

export function median(array) {
  return array[Math.floor(array.length / 2)];
}