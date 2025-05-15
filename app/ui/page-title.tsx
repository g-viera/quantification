import { inter } from "@app/ui/fonts";

export default async function PageTitle({ title }) {
  return (
    <h1
      className={`${inter.className} antialiased text-4xl font-medium text-center mb-8`}
    >
      {title}
    </h1>
  );
}
