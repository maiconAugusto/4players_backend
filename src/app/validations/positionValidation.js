export default function checkPositions(position, positions) {
  const value = positions.map((item) => position.includes(item));
  return value.includes(true);
}
