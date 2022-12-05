export const formatAudioLen = (len) => {
  let minutes = Math.floor((len % 3600) / 60);
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  let seconds = Math.floor(len % 60);
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  let output = `${minutes}:${seconds}`;
  return output;
};
