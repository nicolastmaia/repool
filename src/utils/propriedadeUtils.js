module.exports = {
  substituteInterest: (newInterest, propInterests) => {
    const interestTobeSub = propInterests.find(
      (interest) => interest.id === newInterest.id
    );
    newInterest = { ...newInterest, User: interestTobeSub.User };
    const editedPropInterests = propInterests.filter(
      (interest) => interest.id !== newInterest.id
    );
    editedPropInterests.push(newInterest);
    return editedPropInterests;
  },
};
