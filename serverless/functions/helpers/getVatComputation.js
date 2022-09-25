module.exports = (amount) => {
  const vatable_sales = amount / 1.12;
  const vat = amount - vatable_sales;

  return {
    vatable_sales,
    vat,
  };
};
