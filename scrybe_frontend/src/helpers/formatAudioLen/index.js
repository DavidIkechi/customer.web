export const formatAudioLen = (len) => {
  const hr = Math.floor(len / 3600);
  const minutes = Math.floor(len / 60);
  const seconds = len % 60;
  const output = `${hr}:${minutes}:${seconds}`;
  return output;
};
