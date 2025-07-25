import Image from "next/image";
import health from "@/../public/health.png";
import univerisy from "@/../public/university.png";
import WorflowImg01 from "@/../public/workflow-01.png";
import WorflowImg02 from "@/../public/workflow-02.png";
import WorflowImg03 from "@/../public/workflow-03.png";
import { Button } from "../ui/button";
import {useTranslations} from 'next-intl';


export default function ServicesCardUI() {
    const msgs = ["", "Hey👋🏻\nI’d like to apply for my residence permit!", "Hey👋🏻\nI’d like to apply for a university!", , "Hey👋🏻\nI’d like to apply for my certificate accreditation!"]
    const t = useTranslations('services');

    return(
        <>
        {[...Array(4)].map((_, i) => (
            <a
            key={i}
            href={i === 0 ? "/insurance" : 
                i === 1 ? `https://wa.me/+905434948414?text=${msgs[i]}` :
                i === 2 ? `https://wa.me/+905074332296?text=${msgs[i]}` :
            `https://wa.me/+905076378139?text=${msgs[i]}`}
            className="group/card relative flex flex-col overflow-hidden rounded-sm bg-gray-100 p-px shadow-sm
                before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 
                before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-[#e85f5e] 
                before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 
                after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 
                after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-[#e85f5e] 
                after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 
                group-hover:before:opacity-100 cursor-pointer"
            >
                <div className="relative z-20 flex flex-col h-full overflow-hidden rounded-[inherit] bg-gray-100">
                    {/* Arrow */}
                    <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#e85f5e] bg-[#f47070] text-gray-100 opacity-90">
                        <svg xmlns="http://www.w3.org/2000/svg" width={9} height={8} fill="none">
                            <path fill="#F4F4F5" d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z" />
                        </svg>
                    </div>

                    {/* Image */}
                    <Image className="inline-flex w-full px-6 pt-4" src={i == 0 ? health : i==1 ? WorflowImg01 : i==2 ? WorflowImg02 : WorflowImg03 } alt="Workflow" />

                    {/* Content */}
                    <div className="flex flex-1 flex-col px-4 pt-4 pb-4">
                        <h3 className="text-[#1e547c] text-2xl font-semibold text-center mb-2 min-h-[60px]">
                            {i === 0 ? t("helthTitle") :
                            i === 1 ? t("residenceTitle") :
                            i === 2 ? t("universityApplyTitle") :
                            t("CertificateAccreditationTitle")}
                        </h3>

                        <p className="text-[#103c5c] text-justify flex-1">
                            {i === 0 ? t("helthDesc") :
                            i === 1 ? t("residenceDesc") :
                            i === 2 ? t("universityApplyDesc") :
                            t("CertificateAccreditationDesc")}
                        </p>

                        <Button className="w-full mt-4 rounded-sm py-5 bg-[#1e547c] hover:bg-[#103c5c] cursor-pointer">
                            {i === 0 ? t("helthBtn") : 
                            i === 1 ? t("residenceBtn") : 
                            i === 2 ? t("universityApplyBtn") :
                            t("CertificateAccreditationBtn")}
                        </Button>
                    </div>
                </div>
            </a>
        ))}
        </>
    )
}