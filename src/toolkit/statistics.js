export function group(array, selector) {
  let result = new Map();

  array.forEach(item => {
    const category = selector(item);
    if (!result.get(category)) result.set(category, []);
    result.get(category).push(item);
  })

  return result;
}

export function median(array, default_) {
  return array.length == 0 ? default_ : array.sort((a, b) => a - b)[Math.floor((array.length - 1) / 2)];
}

export function max(array, default_) {
  return array.length == 0 ? default_ : Math.max(...array);
}