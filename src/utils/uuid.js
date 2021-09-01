let uuid = 0;

export function seed(initialSeed) {
  uuid = initialSeed + 1;
}

export function generateUUId() {
  uuid++;
  return uuid;
}
