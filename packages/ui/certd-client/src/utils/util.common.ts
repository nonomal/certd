import * as _ from "lodash-es";
export default {
  arrayToMap(array: any) {
    if (!array) {
      return {};
    }
    if (!_.isArray(array)) {
      return array;
    }
    const map: any = {};
    for (const item of array) {
      if (item.key) {
        map[item.key] = item;
      }
    }
    return map;
  },
  mapToArray(map: any) {
    if (!map) {
      return [];
    }
    if (_.isArray(map)) {
      return map;
    }
    const array: any = [];
    for (const key in map) {
      const item = map[key];
      item.key = key;
      array.push(item);
    }
    return array;
  },

  async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  maxLength(str?: string, length = 100) {
    if (str) {
      return str.length > length ? str.slice(0, length) + "..." : str;
    }
    return "";
  }
};
