export const formatAudioSize = (size) => {
  if (size % 1 !== 0) {
    size = size.toFixed(2);
  }
  return `${size} MB`;
};
