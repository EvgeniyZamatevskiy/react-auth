export const getRemainingTime = (time) => {
  const minutes = `0${time === 60 ? 1 : 0}`;
  const seconds = `${time === 60 ? "00" : time < 10 ? `0${time}` : time}`;

  return `${minutes}:${seconds}`;
};
