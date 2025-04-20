export default function Footer() {
  const year = (new Date()).getFullYear().toString();
  return (
    <footer>
      <p>&copy; {year}.</p>
    </footer>
  );
}