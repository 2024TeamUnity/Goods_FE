export const addComma = (str: string): string => {
  const formattedStr = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formattedStr;
};
