export default function ForceError() {
  const x = null;
  const y = x.y;
  return <p>ForceError {y}</p>;
}
