import Link from "next/link";
import { inter } from "@app/ui/fonts";
// import styles from "./site-header.module.css";

export default async function SiteHeader({ site }) {
  return (
    <header id="site-header" className="mb-8">
      <div>
        <Link href="/">
          <span title="Home page"
            className={`${inter.className} 
          antialiased tracking-[0.5em] text-xl 
          font-stretch-expanded font-black`}
          >
            {site.name}
          </span>
        </Link>
      </div>
      <div className="mb-2">
        <span className="tracking-[0.3em] text-gray-400 text-sm">
          {site.phrase}
        </span>
      </div>
      <div
        className="text-gray-400 text-sm"
        dangerouslySetInnerHTML={{ __html: site.bannerHtml }}
      ></div>
    </header>
  );
}
