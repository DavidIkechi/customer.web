export const formatAudioSize = (size) => {
  const sizeInMB = size / 100000;
  return sizeInMB.toFixed(2);
};
