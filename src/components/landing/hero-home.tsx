import Image from "next/image";
import PageIllustration from "./page-illustration";
import { FaLocationArrow } from "react-icons/fa";
import { BsBuildings } from "react-icons/bs";

export default function HeroHome() {
  return (
    <section className="relative mt-[-65px] overflow-x-hidden">
        <PageIllustration />
        {/* Hero content */}
        <div className="pb-12 pt-32 md:pb-15 md:pt-45">
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
                          <a href="/services" className="btn px-4 group w-full sm:w-auto py-[11px] transition-all text-white bg-[#1e547c] hover:bg-[#103c5c] rounded-sm">
                              <span className="inline-flex items-center gap-2">Browse Services <FaLocationArrow /></span>
                          </a>

                          <a
                            href="/about-masar"
                            className="btn w-full sm:w-auto py-[9.5px] px-4 bg-transparent border-[#e85f5e] transition-all border-1 hover:bg-[#e85f5e] hover:text-gray-50 shadow-sm rounded-sm"
                          >
                              <span className="inline-flex items-center gap-2"><BsBuildings /> About Masar</span>
                          </a>
                      </div>
                  </div>
              </div>
            </div>
        </div>
    </section>
  );
}
