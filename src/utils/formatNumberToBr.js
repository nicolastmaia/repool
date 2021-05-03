const formatNumberToBr = (number) => {
  return `R$ ${number.toFixed(2).replace('.', ',')}`;
};

export default formatNumberToBr;
