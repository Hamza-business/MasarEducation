import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex" aria-label="Cruip">
      <img src="/logomasar.png"/>
    </Link>
  );
}
