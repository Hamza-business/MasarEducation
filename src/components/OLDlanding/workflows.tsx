import ServicesCardUI from "./servicesCardUI";
import Spotlight from "./spotlight";
import { Container } from "@/app/(site)/container";
import {useTranslations} from 'next-intl';

export default function Workflows() {
    const t = useTranslations('services');
    return (
        <section id="services" className="pt-5 pb-16">
            <Container>
                {/* <div className="mx-auto max-w-3xl pb-10 text-center">
                    <div className="inline-flex items-center gap-3 pb-2 before:h-px before:flex-1">
                        <span className="inline-block bg-gradient-to-r from-[#e96262] to-[#d34f4f] bg-clip-text text-2xl text-transparent font-semibold">
                            {t("MasarServices")}
                        </span>
                    </div>
                    <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,#cf4444,#cf4444,#103c5c,#103c5c,#e85f5e)] bg-clip-text text-transparent font-nacelle text-3xl md:text-5xl font-semibold">
                        {t("Startyourjourney")}
                    </h2>
                    <p className="text-lg text-[#144160] font-semibold">
                        No more efforts, our services are here to help you get rid of this hard work!
                    </p>
                </div> */}

                <Spotlight className="mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    <ServicesCardUI/>
                </Spotlight>
            </Container>
        </section>
    );
}
