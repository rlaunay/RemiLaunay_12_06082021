const unite = {
  calorie: 'kCal',
  protein: 'g',
  carbohydrate: 'g',
  lipid: 'g',
};

export const dataFormat = (value: number, unite: string): string => {
  const valueFormtted = numberWithCommas(value);

  return valueFormtted;
};

function numberWithCommas(nb: number) {
  return nb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
