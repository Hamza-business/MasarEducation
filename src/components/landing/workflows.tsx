import Image from "next/image";
import WorflowImg01 from "@/../public/workflow-01.png";
import WorflowImg02 from "@/../public/workflow-02.png";
import WorflowImg03 from "@/../public/workflow-03.png";
import Spotlight from "./spotlight";
import { Container } from "@/app/(site)/container";
import { Button } from "../ui/button";

export default function Workflows() {
    return (
        <section id="services" className="py-16">
            <Container>
                <div className="mx-auto max-w-3xl pb-10 text-center">
                    <div className="inline-flex items-center gap-3 pb-3 before:h-px before:flex-1">
                        <span className="inline-block bg-gradient-to-r from-[#e96262] to-[#d34f4f] bg-clip-text text-2xl text-transparent font-semibold">
                            Masar Services
                        </span>
                    </div>
                    <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,#cf4444,#cf4444,#103c5c,#103c5c,#e85f5e)] bg-clip-text text-transparent font-nacelle text-3xl md:text-5xl font-semibold pb-4">
                        Start your journey in Turkey with our Services!
                    </h2>
                    {/* <p className="text-lg text-[#144160] font-semibold">
                        No more efforts, our services are here to help you get rid of this hard work!
                    </p> */}
                </div>

                <Spotlight className="mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <a
                        key={i}
                        href={i === 0 ? "/service/insurance" : "#"}
                        className="group/card relative flex flex-col overflow-hidden rounded-sm bg-gray-100 p-px shadow-sm
                            before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 
                            before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-[#e85f5e] 
                            before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 
                            after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 
                            after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-[#e85f5e] 
                            after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 
                            group-hover:before:opacity-100"
                        >
                            <div className="relative z-20 flex flex-col h-full overflow-hidden rounded-[inherit] bg-gray-100">
                                {/* Arrow */}
                                <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#e85f5e] bg-[#f47070] text-gray-100 opacity-90">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={9} height={8} fill="none">
                                        <path fill="#F4F4F5" d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z" />
                                    </svg>
                                </div>

                                {/* Image */}
                                <Image className="inline-flex w-full px-6 pt-4" src={WorflowImg01} alt="Workflow" />

                                {/* Content */}
                                <div className="flex flex-1 flex-col px-4 pt-4 pb-4">
                                    <h3 className="text-[#1e547c] text-2xl font-semibold text-center mb-2 min-h-[60px]">
                                        {i === 0 ? "Apply for Health Insurance" :
                                        i === 1 ? "Apply for Residence Permit" :
                                        i === 2 ? "Apply to University" :
                                        "Apply for Certificate Accreditation"}
                                    </h3>

                                    <p className="text-[#103c5c] text-justify flex-1">
                                        {i === 0 ? "Secure your official student health insurance quickly and safely." :
                                        i === 1 ? "Let us handle your student residence permit application with ease." :
                                        i === 2 ? "Get support with your admission to top universities in Türkiye" :
                                        "Accredit your certificates for use in Türkiye’s education system."}
                                    </p>

                                    <Button className="w-full mt-4 rounded-sm py-5 bg-[#1e547c] hover:bg-[#103c5c]">
                                        {i === 0 ? "Get Your Insurance Now!" : 
                                        i === 1 ? "Start your life in Turkey!" : 
                                        i === 2 ? "Start your academic Journey!" :
                                        "Apply Now!"}
                                    </Button>
                                </div>
                            </div>
                        </a>
                    ))}
                </Spotlight>
            </Container>
        </section>
    );
}
