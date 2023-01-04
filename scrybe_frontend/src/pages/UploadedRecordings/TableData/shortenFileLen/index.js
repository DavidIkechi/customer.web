export const shortenfilename = (filenameTxt) => {
  const filename = filenameTxt;
  const filenameLen = filename.length;
  if (filenameLen > 26) {
    const filenameShort = filename.substring(0, 26);
    return `${filenameShort}...mp3`;
  } else {
    return filename;
  }
};
