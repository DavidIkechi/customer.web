export const formatAudioLen = (len) => {
  const min = len;
  if (len < 10) {
    return `0${min}:00`;
  } else {
    return `${min}:00`;
  }
};
