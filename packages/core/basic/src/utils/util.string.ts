export const stringUtils = {
  maxLength(str?: string, length = 100) {
    if (str) {
      return str.length > length ? str.slice(0, length) + '...' : str;
    }
    return '';
  },
};
