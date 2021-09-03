export const capitalizeString = (str: string): string => {
  if (!str) return '';

  return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
};

export const getMarkColor = (num: any): string => {
  if (!num) return '';

  if (num >= 8) return 'green';
  else if (num >= 4) return 'orange';
  else return 'red';
};
