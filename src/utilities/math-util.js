export const TWOS = {
  abs: (x) => (x > 0 ? x : TWOS.neg(x)),
  neg: (x) => -(x + 1),
  sign: (x) => (x >= 0 ? 1 : -1),
};

export const ms2minSec = (millis) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

export const mod = (n, m) => ((n % m) + m) % m;
