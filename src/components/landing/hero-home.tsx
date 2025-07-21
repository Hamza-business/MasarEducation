import Image from "next/image";
import PageIllustration from "./page-illustration";

export default function HeroHome() {
  return (
    <section className="relative mt-[-60px]">
        <PageIllustration />
        {/* Hero content */}
        <div className="pb-12 pt-32 md:pb-50 md:pt-50">
            {/* Section header */}
            <div className="text-center px-2">
              <p
                className="mb-6 tracking-widest text-5xl w-fit text-center mx-auto font-semibold text-gray-700 border-b-3 border-amber-500"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >Masar</p>
              <div className="w-full">
                <h1
                  className="mb-8 leading-18 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1] md:text-6xl"
                  data-aos="zoom-y-out"
                  data-aos-delay={150}
                >Your Trusted Gateway<br/>to Study and Live in Turkey 🇹🇷</h1>
                <div className="relative before:absolute before:inset-0 before:border-y before:[border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1]">
                  <div
                    className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
                    data-aos="zoom-y-out"
                    data-aos-delay={450}
                  >
                    <a
                      className="btn group mb-4 w-full bg-linear-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                      href="#0"
                    >
                      <span className="relative inline-flex items-center">
                        Start Free Trial{" "}
                        <span className="ml-1 tracking-normal text-blue-300 transition-transform group-hover:translate-x-0.5">
                          -&gt;
                        </span>
                      </span>
                    </a>
                    <a
                      className="btn w-full bg-white text-gray-800 shadow-sm hover:bg-gray-50 sm:ml-4 sm:w-auto"
                      href="#0"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </section>
  );
}
