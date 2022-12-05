export const formatAudioLen = (len) => {
  const minutes = Math.floor(len / 60);
  const seconds = len % 60;
  const output = `${minutes}:${seconds}`;
  return output;
};
