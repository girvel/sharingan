export function log(x) {
  console.log(x);
  return x;
}

export function inDevelopmentMode() {
  return import.meta.env.MODE == "development";
}