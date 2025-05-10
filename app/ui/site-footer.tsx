export default function SiteFooter({ site }) {
  const year = new Date().getFullYear().toString();
  return (
    <footer className="mt-8">
      <p className="text-sm text-gray-500">
        &copy; {site.copyright.owner} {site.copyright.from} - {year}.
      </p>
    </footer>
  );
}
