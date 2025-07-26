import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex" aria-label="Cruip">
      <img src="/logoen.png" className="max-w-[350px] w-full bg-[#f7f7fa]"/>
    </Link>
  );
}
