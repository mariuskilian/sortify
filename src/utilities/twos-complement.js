export const TWOS = {
  abs: (x) => (x > 0 ? x : TWOS.neg(x)),
  neg: (x) => -(x + 1),
  sign: (x) => (x >= 0 ? 1 : -1),
};
