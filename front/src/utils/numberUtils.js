const formatPriceToBr = (number) => {
  return `R$ ${number.toFixed(2).replace('.', ',')}`;
};

module.exports = { formatPriceToBr };
