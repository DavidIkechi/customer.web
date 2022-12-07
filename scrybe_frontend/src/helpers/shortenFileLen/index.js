export const shortenfilename = (filenameTxt) => {
  const filename = filenameTxt;
  const filenameLen = filename.length;
  if (filenameLen > 30) {
    const filenameShort = filename.substring(0, 30);
    return `${filenameShort}...mp3`;
  } else {
    return filename;
  }
};
