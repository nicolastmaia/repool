/* eslint-disable no-restricted-syntax */
export const isEmpty = (obj) => !!Object.keys(obj).length;

export const fillObjectIfNotNull = (obj) => {
  const filledObj = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value) {
      filledObj[key] = value;
    }
  }

  return filledObj;
};
