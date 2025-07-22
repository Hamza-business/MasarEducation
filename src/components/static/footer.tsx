import Link from "next/link";
import Logo from "./logo";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";

export default function Footer({ border = false }: { border?: boolean }) {
  return (
    <footer className="shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      {/* Big text */}
      <div className="absolute z-[-1] h-30 w-full" aria-hidden="true">
        <div className="pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2 text-center text-[260px] font-bold leading-none before:bg-linear-to-b before:from-gray-200 before:to-gray-100/30 before:to-80% before:bg-clip-text before:text-transparent before:content-['Masar'] after:absolute after:inset-0 after:bg-gray-300/70 after:bg-clip-text after:text-transparent after:mix-blend-darken after:content-['Masar'] after:[text-shadow:0_1px_0_white]"></div>
        {/* Glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3"
          aria-hidden="true"
        >
          <div className="h-56 w-56 rounded-full border-[20px] border-blue-700 blur-[80px]"></div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top area: Blocks */}
        <div
          className={`grid gap-10 py-8 sm:grid-cols-12 md:py-12 ${border ? "border-t [border-image:linear-gradient(to_right,transparent,var(--color-slate-200),transparent)1]" : ""}`}
        >
          {/* 1st block */}
          <div className="space-y-2 sm:col-span-12 lg:col-span-3">
            <div>
              <Logo />
            </div>
            <div className="text-sm text-gray-600">
              &copy; masartr.com - All rights reserved.
            </div>
          </div>
          <div className="space-y-2 sm:col-span-12 lg:col-span-1">
          </div>

          {/* 2nd block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-gray-600 transition hover:text-gray-900"
                  href="/services"
                >Services
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 transition hover:text-gray-900"
                  href="/services/insurance"
                >Order Insurance
                </Link>
              </li>
            </ul>
          </div>

          {/* 3rd block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-3">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-gray-600 transition hover:text-gray-900"
                  href="/about-masar"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 transition hover:text-gray-900"
                  href="#features"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 transition hover:text-gray-900"
                  href="#0"
                >
                  Terms of service
                </Link>
              </li>
            </ul>
          </div>

          {/* 5th block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-3">
            <h3 className="text-sm font-medium">Social</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-[#db5656] transition hover:text-[#e85f5e] font-semibold"
                  href="https://www.instagram.com/masar.turkey?igsh=MTJrZnloeTM1anJjZw"
                  aria-label="Twitter"
                ><span className="flex items-center gap-2"><FaInstagram className="h-7 w-7"/>@masar.turkey</span></Link>
              </li>
              <li>
                <Link
                  className="text-[#db5656] transition hover:text-[#e85f5e] font-semibold"
                  href="mailto:support@masartr.com"
                  aria-label="Twitter"
                ><span className="flex items-center gap-2"><MdOutlineEmail className="h-7 w-7"/> support@masartr.com</span></Link>
              </li>
              <li>
                <Link
                  className="text-[#db5656] transition hover:text-[#e85f5e] font-semibold"
                  href="tel:+905434948414"
                  aria-label="Twitter"
                ><span className="flex items-center gap-2"><BsTelephone className="h-7 w-7"/> +90 543 494 8414⠀</span></Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
