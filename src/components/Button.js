export default function Button({ children, otherClassnames = 'btn', onClick }) {
  return (
    <button className={otherClassnames} onClick={onClick}>
      {children}
    </button>
  );
}
