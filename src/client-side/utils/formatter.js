export const currencyFormat = (number) => {
  const formatter = new Intl.NumberFormat("en-PH", {
    currency: "PHP",
    currencyDisplay: "code",
    minimumFractionDigits: 2,
    style: "currency",
  });

  return formatter.format(number);
};
