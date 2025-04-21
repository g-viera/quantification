import '@ui/globals.css'
import { open_sans } from '@ui/fonts'
import Header from "@app/ui/header";
import Footer from "@app/ui/footer";
import { getSite } from "@app/lib/data";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const siteName = (await getSite()).name;

  return (
    <html lang="en">
      <body className={`${open_sans.className} antialiased`}>
        <Header siteName={siteName}/>
        {children}
        <Footer />
      </body>
    </html>
  )
}