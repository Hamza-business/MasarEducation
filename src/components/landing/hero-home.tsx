import Image from "next/image";
import PageIllustration from "./page-illustration";
import { FaLocationArrow } from "react-icons/fa";

export default function HeroHome() {
  return (
    <section className="relative mt-[-65px]">
        <PageIllustration />
        {/* Hero content */}
        <div className="pb-12 pt-32 md:pb-25 md:pt-55">
            {/* Section header */}
            <div className="text-center px-2">
              <p
                className="mb-6 tracking-widest text-5xl w-fit text-center mx-auto font-semibold text-[#1e547c] border-b-3 border-[#e85f5e]"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >Masar</p>
              <div className="w-full">
                  <h1 className="mb-8 leading-18 py-6 border-y text-5xl font-bold borderedo md:text-6xl" data-aos="zoom-y-out" data-aos-delay={150}>
                      Your Trusted Gateway<br/>to Study and Live in Turkey 🇹🇷
                  </h1>
                  <div className="relative py-2">
                      <div className="mx-auto flex max-w-fit flex-col items-center gap-4 sm:flex-row sm:justify-center" data-aos="zoom-y-out" data-aos-delay={450}>
                          <a href="#services" className="btn group w-full sm:w-auto p-3 transition-all text-white bg-[#1e547c] hover:bg-[#103c5c] rounded-sm">
                              <span className="inline-flex items-center gap-2">Browse Services <FaLocationArrow /></span>
                          </a>

                          <a
                            href="/services/insurance/order"
                            className="btn w-full sm:w-auto py-[11.2px] px-3 bg-transparent border-[#e85f5e] transition-all border-1 hover:bg-[#e85f5e] hover:text-gray-50 shadow-sm rounded-sm"
                          >
                            Order Your Insurance
                          </a>
                      </div>
                  </div>
              </div>
            </div>
        </div>
    </section>
  );
}
