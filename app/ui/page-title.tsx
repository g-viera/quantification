import { inter } from "@app/ui/fonts";

export default async function PageTitle({ title }) {
  return (
    <h1 className={`${inter.className} antialiased text-2xl font-bold text-center mb-8`}>
      {title}
    </h1>
  );
}