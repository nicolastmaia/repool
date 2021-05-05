/* eslint-disable no-restricted-syntax */
const isEmpty = (obj) => !!Object.keys(obj).length;

const fillObjectIfNotNull = (obj) => {
  const filledObj = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value) {
      filledObj[key] = value;
    }
  }

  return filledObj;
};

module.exports = { isEmpty, fillObjectIfNotNull };
