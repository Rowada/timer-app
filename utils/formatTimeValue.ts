export const formatTimeValue = (value, maxValue) => {
  const intValue = parseInt(value, 10);

  if (isNaN(intValue)) return 0;

  const v = Number(intValue.toString().slice(-2));

  return Math.min(v, maxValue);
};
