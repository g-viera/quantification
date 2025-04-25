import Link from 'next/link';
import { inter } from '@app/ui/fonts';

export default function Header({ siteName }) {
  return (
    <header className="mb-8">
      <Link href="/">
        <span className={`${inter.className} antialiased text-xl font-black`}>
          {siteName}
        </span>
      </Link>
    </header>
  );
}