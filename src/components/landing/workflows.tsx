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
                        <a
                          className="shadow-sm group/card relative overflow-hidden rounded-sm bg-gray-100 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-[#e85f5e] before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-[#e85f5e] after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100"
                          href="/services/insurance/order">
                            <div className="relative z-20 overflow-hidden rounded-[inherit] bg-gray-100 after:absolute after:inset-0 ">
                               <div
                                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#e85f5e] bg-[#f47070] text-gray-100 opacity-90"
                                    aria-hidden="true">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={9} height={8} fill="none">
                                    <path fill="#F4F4F5" d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z"/>
                                    </svg>
                               </div>
                                <Image
                                className="inline-flex w-full px-6"
                                src={WorflowImg01}
                                alt="Workflow 01"/>
                                <div className="pt-0 px-4 pb-4">
                                    <div className="mb-3">
                                        <h3 className="text-[#1e547c] text-2xl font-semibold text-center">Apply for Health Insurance</h3>
                                    </div>
                                    <p className="text-[#103c5c] text-justify">
                                        Secure your official student health insurance quickly and safely.
                                    </p>
                                    <Button className="w-full mt-3 rounded-sm py-5 bg-[#1e547c] hover:bg-[#103c5c]">Get Your Insurance Now!</Button>
                                </div>
                            </div>
                        </a>
                        <a
                          className="shadow-sm group/card relative h-full overflow-hidden rounded-sm bg-gray-100 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-[#e85f5e] before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-[#e85f5e] after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100"
                          href="#0">
                            <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-100 after:absolute after:inset-0 ">
                              {/* Arrow */}
                              <div
                                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#e85f5e] bg-[#f47070] text-gray-100 opacity-90"
                                  aria-hidden="true">
                                  <svg xmlns="http://www.w3.org/2000/svg" width={9} height={8} fill="none">
                                    <path fill="#F4F4F5" d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z"/>
                                  </svg>
                              </div>
                              {/* Image */}
                              <Image
                                  className="inline-flex w-full px-6"
                                  src={WorflowImg01}
                                  alt="Workflow 01"/>
                                  {/* Content */}
                                  <div className="pt-0 px-4 pb-4">
                                      <div className="mb-3">
                                          <h3 className="text-[#1e547c] text-2xl font-semibold text-center">Apply for Residence Permit</h3>
                                      </div>
                                      <p className="text-[#103c5c] text-justify">
                                          Let us handle your student residence permit application with ease.
                                      </p>
                                      <Button className="w-full mt-3 rounded-sm py-5 bg-[#1e547c] hover:bg-[#103c5c]">Apply Now!</Button>
                                  </div>
                            </div>
                        </a>
                        <a
                          className="shadow-sm group/card relative overflow-hidden rounded-sm bg-gray-100 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-[#e85f5e] before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-[#e85f5e] after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100"
                          href="#0">
                            <div className="relative z-20 overflow-hidden rounded-[inherit] bg-gray-100 after:absolute after:inset-0 ">
                              {/* Arrow */}
                              <div
                                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#e85f5e] bg-[#f47070] text-gray-100 opacity-90"
                                  aria-hidden="true">
                                  <svg xmlns="http://www.w3.org/2000/svg" width={9} height={8} fill="none">
                                    <path fill="#F4F4F5" d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z"/>
                                  </svg>
                              </div>
                              {/* Image */}
                              <Image
                                  className="inline-flex w-full px-6"
                                  src={WorflowImg01}
                                  alt="Workflow 01"/>
                                  {/* Content */}
                                  <div className="pt-0 px-4 pb-4">
                                      <div className="mb-3">
                                          <h3 className="text-[#1e547c] text-2xl font-semibold text-center">Apply to University</h3>
                                      </div>
                                      <p className="text-[#103c5c] text-justify">
                                            Get support with your admission to top universities in Türkiye
                                      </p>
                                      <Button className="w-full mt-3 rounded-sm py-5 bg-[#1e547c] hover:bg-[#103c5c]">Apply Now!</Button>
                                  </div>
                            </div>
                        </a>
                        <a
                          className="shadow-sm group/card relative overflow-hidden rounded-sm bg-gray-100 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-[#e85f5e] before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-[#e85f5e] after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100"
                          href="#0">
                            <div className="relative z-20 overflow-hidden rounded-[inherit] bg-gray-100 after:absolute after:inset-0 ">
                              {/* Arrow */}
                              <div
                                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#e85f5e] bg-[#f47070] text-gray-100 opacity-90"
                                  aria-hidden="true">
                                  <svg xmlns="http://www.w3.org/2000/svg" width={9} height={8} fill="none">
                                    <path fill="#F4F4F5" d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z"/>
                                  </svg>
                              </div>
                              {/* Image */}
                              <Image
                                  className="inline-flex w-full px-6"
                                  src={WorflowImg01}
                                  alt="Workflow 01"/>
                                  {/* Content */}
                                  <div className="pt-0 px-4 pb-4">
                                      <div className="mb-3">
                                          <h3 className="text-[#1e547c] text-2xl font-semibold text-center">Apply for Certificate Accreditation</h3>
                                      </div>
                                      <p className="text-[#103c5c] text-justify">
                                          Accredit your certificates for use in Türkiye’s education system.
                                      </p>
                                      <Button className="w-full mt-3 rounded-sm py-5 bg-[#1e547c] hover:bg-[#103c5c]">Apply Now!</Button>
                                  </div>
                            </div>
                        </a>
                    </Spotlight>
                </div>
            </Container>
        </section>
    );
}
