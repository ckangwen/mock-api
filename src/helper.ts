export function isPlainObject(obj: any) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
