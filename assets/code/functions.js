export const mapCopy = (obj, callback) => {
  let ret = {};
  if (Array.isArray(obj)) {
    return Array.prototype.slice.call(obj);
  }
  if (typeof obj !== 'object') {
    return obj;
  }
  for (let key in obj) {
    ret[key] = mapCopy(obj[key]);
  }
  return ret;
}
