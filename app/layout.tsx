import '@ui/globals.css'
import { open_sans } from '@ui/fonts'
import Header from "@app/ui/header";
import Footer from "@app/ui/footer";
import { site } from '@app/lib/data';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${open_sans.className} antialiased`}>
        <Header siteName={site.name}/>
        {children}
        <Footer />
      </body>
    </html>
  )
}