export default function clamp01(t) {
  if (t<0) return 0;
  if (t>1) return 1;
  return t;
}
