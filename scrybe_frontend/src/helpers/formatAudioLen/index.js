export const formatAudioLen = (num) => {
  const minutes = Math.floor(num / 60);
  const seconds = num % 60;
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};
