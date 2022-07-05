
export default function Icon({ type, size }) {
  return (
    <span className="material-icons" style={{fontSize: size || '1em'}}>
      { type }
    </span>
  );
}
