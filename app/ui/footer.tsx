export default function Footer() {
  const year = (new Date()).getFullYear().toString();
  return (
    <footer className="mt-8">
      <p>&copy; {year}.</p>
    </footer>
  );
}