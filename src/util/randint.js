export default function randint(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
