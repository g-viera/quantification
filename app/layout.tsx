import "@app/globals.css";
import { open_sans } from "@app/ui/fonts";
import SiteHeader from "@app/ui/site-header";
import SiteFooter from "@app/ui/site-footer";
import { getSite } from "@app/lib/api";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = getSite();
  return (
    <html lang="en">
      <body className={`${open_sans.className} antialiased mx-auto max-w-3xl`}>
        <SiteHeader site={site} />
        {children}
        <SiteFooter site={site} />
      </body>
    </html>
  );
}
