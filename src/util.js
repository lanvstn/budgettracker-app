import moment from "moment";

export function formatCurrency(number, decimals) {
  if (decimals === undefined) {
    decimals = 2;
  }

  return "€ " + Number(number).toFixed(decimals);
};

export function totals(expenses) {
  return Array.from(
    Object.values(expenses).reduce((totals, val) => {
      let curr = totals.get(val.cat);
      if (curr === undefined) curr = 0;
      totals.set(val.cat, curr + Number(val.amount));
      return totals;
    }, new Map()).entries()
  );
}

export function formatMonth(monthIndex, format) {
  if (format === undefined) {
    format = "MMMM";
  }
  const fullDateFromMonth = `2020-${monthIndex + 1}-01`;
  return moment(fullDateFromMonth).format(format);
}
