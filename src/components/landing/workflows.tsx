import Image from "next/image";
import WorflowImg01 from "@/../public/workflow-01.png";
import WorflowImg02 from "@/../public/workflow-02.png";
import WorflowImg03 from "@/../public/workflow-03.png";
import Spotlight from "./spotlight";
import { Container } from "@/app/(site)/container";
import { Button } from "../ui/button";

export default function Workflows() {
    return (
        <section id="services">
            <Container className="flex justify-between items-center">
                <div className="mt-15 mb-30">
                    {/* Section header */}
                    <div className="mx-auto max-w-3xl pb-10 text-center md:pb-12">
                        <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-60 before:bg-linear-to-r before:from-transparent before:to-[#e85f5e] after:h-px after:w-60 after:bg-linear-to-l after:from-transparent after:to-[#e85f5e]">
                            <span className="inline-flex bg-linear-to-r text-[#e85f5e] bg-clip-text text-2xl">Masar Services</span>
                        </div>
                        <h2 className="animate-[gradient_6s_linear_infinite] 
                        bg-[linear-gradient(to_right,_#cf4444,_#cf4444,_#103c5c,_#103c5c,_#e85f5e)] 
                        bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-5xl">
                          Start your journey in Turkey with our Services
                        </h2>
                        <p className="text-lg text-[#144160] font-semibold">
                          No more efforts, our services are here to help you get rid of this hard work!
                        </p>
                    </div>

                  <Spotlight className="group mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-4">
                    {/* Card 1 */}
                    <a
                      className="group/card relative h-full overflow-hidden rounded-sm bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-indigo-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100"
                      href="#0"
                    >
                      <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                        {/* Arrow */}
                        <div
                          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-gray-700/50 bg-gray-800/65 text-gray-200 opacity-100"
                          aria-hidden="true"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={9}
                            height={8}
                            fill="none"
                          >
                            <path
                              fill="#F4F4F5"
                              d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z"
                            />
                          </svg>
                        </div>
                        {/* Image */}
                        <Image
                          className="inline-flex w-full px-6"
                          src={WorflowImg01}
                          alt="Workflow 01"
                        />
                        {/* Content */}
                        <div className="p-4">
                          <div className="mb-3">
                            <h3 className="text-gray-200 text-2xl font-semibold text-center">Apply for Residence Permit</h3>
                          </div>
                          <p className="text-indigo-200/65 text-justify">
                            Streamline the product development flow with a content
                            platform that's aligned across specs and insights.
                          </p>
                          <Button className="w-full mt-2">Apply Now!</Button>
                        </div>
                      </div>
                    </a>
                  </Spotlight>
                </div>
            </Container>
        </section>
    );
}
