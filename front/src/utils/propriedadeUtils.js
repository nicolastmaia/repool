export const substituteInterest = (newInterest, propInterests) => {
  const interestTobeSub = propInterests.find((interest) => interest.id === newInterest.id);
  newInterest = { ...newInterest, User: interestTobeSub.User };
  const editedPropInterests = propInterests.filter((interest) => interest.id !== newInterest.id);
  editedPropInterests.push(newInterest);
  return editedPropInterests;
};

export const separateActiveAndInactive = (rents) => {
  const active = rents.find((rent) => rent.isActive === true);
  const inactive = rents.filter((rent) => rent.isActive === false);
  return [active, inactive];
};
