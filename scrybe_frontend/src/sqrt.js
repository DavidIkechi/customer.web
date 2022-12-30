function isSquare(n) {
  const sqr = Math.sqrt(n);
  if (n !== sqr * sqr) {
    return false;
  } else {
    return sqr;
  }
}

console.log(isSquare(5)); // true
