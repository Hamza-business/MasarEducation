import Image from "next/image";
import BlurredShapeGray from "@/../public/blurred-shape-gray.svg";
import BlurredShape from "@/../public/blurred-shape.svg";
import { Container } from "@/app/(site)/container";
import { GiMeshNetwork, GiPlatform } from "react-icons/gi";
import { LuMousePointerClick } from "react-icons/lu";
import { SiEightsleep } from "react-icons/si";
import { BiSupport } from "react-icons/bi";
import { PiCurrencyDollarSimpleBold } from "react-icons/pi";

export default function Features() {
    return (
        <section id="services" className="py-16">
            <Container>
                <div className="mx-auto max-w-3xl pb-10 text-center">
                    <div className="inline-flex items-center gap-3 pb-3 before:h-px before:flex-1">
                        <span className="inline-block bg-gradient-to-r from-[#e96262] to-[#d34f4f] bg-clip-text text-2xl text-transparent font-semibold">
                            Masar Feautures
                        </span>
                    </div>
                    <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,#cf4444,#cf4444,#103c5c,#103c5c,#e85f5e)] bg-clip-text text-transparent font-nacelle text-3xl md:text-5xl font-semibold pb-4">
                        What Makes Us Different?
                    </h2>
                    {/* <p className="text-lg text-[#144160] font-semibold">
                        No more efforts, our services are here to help you get rid of this hard work!
                    </p> */}
                </div>

                <div className="mx-auto grid max-w-sm gap-12 sm:max-w-none sm:grid-cols-2 md:gap-x-14 md:gap-y-16 lg:grid-cols-3">
                    <article className="">
                        <h3 className="font-nacelle text-2xl font-semibold text-[#e85f5e]">
                            <span className="inline-flex items-center gap-x-2">
                                <GiPlatform className="h-12 w-12 text-[#1e547c]"/>
                                All-in-One Platform
                            </span>
                        </h3>
                        <p className="text-[#144160] font-semibold leading-7 text-justify mt-auto">
                            From university admission to health insurance and residency — everything you need in one place.
                        </p>
                    </article>

                    <article className="">
                        <h3 className="font-nacelle text-2xl font-semibold text-[#e85f5e]">
                            <span className="inline-flex items-center gap-x-2">
                                <LuMousePointerClick className="h-10 w-10 text-[#1e547c]"/>Fully Digital & Easy to Use
                            </span>
                        </h3>
                        <p className="text-[#144160] font-semibold leading-7 text-justify mt-auto">
                            Our smart system lets you submit requests and track updates online.
                        </p>
                    </article>

                    <article className="">
                        <h3 className="font-nacelle text-2xl font-semibold text-[#e85f5e]">
                            <span className="inline-flex items-center gap-x-2">
                                <SiEightsleep className="h-10 w-10 text-[#1e547c]"/>8+ Years of Proven Experience
                            </span>
                        </h3>
                        <p className="text-[#144160] font-semibold leading-7 text-justify mt-auto">
                            Trusted by thousands of students and residents across Turkey.
                        </p>
                    </article>

                    <article className="">
                        <h3 className="font-nacelle text-2xl font-semibold text-[#e85f5e]">
                            <span className="inline-flex items-center gap-x-2">
                                <BiSupport className="h-9 w-9 text-[#1e547c]"/>Dedicated Support
                            </span>
                        </h3>
                        <p className="text-[#144160] font-semibold leading-7 text-justify mt-auto">
                            Our team is always ready to help — fast responses, real people, real solutions.
                        </p>
                    </article>

                    <article className="">
                        <h3 className="font-nacelle text-2xl font-semibold text-[#e85f5e]">
                            <span className="inline-flex items-center gap-x-2">
                                <GiMeshNetwork className="h-9 w-9 text-[#1e547c]"/>Reliable Network
                            </span>
                        </h3>
                        <p className="text-[#144160] font-semibold leading-7 text-justify mt-auto">
                            We work directly with top Turkish universities, government offices, and embassies.
                        </p>
                    </article>

                    <article className="">
                        <h3 className="font-nacelle text-2xl font-semibold text-[#e85f5e]">
                            <span className="inline-flex items-center gap-x-2">
                                <PiCurrencyDollarSimpleBold className="h-9 w-9 text-[#1e547c]"/>Commission Program
                            </span>
                        </h3>
                        <p className="text-[#144160] font-semibold leading-7 text-justify mt-auto">
                            We empower individuals and agencies to earn through our affiliate program with custom tools and tracking.
                        </p>
                    </article>
                </div>
            </Container>
        </section>
    );
}
