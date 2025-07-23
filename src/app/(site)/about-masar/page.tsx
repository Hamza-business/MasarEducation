'use client';

import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { GiPlatform } from 'react-icons/gi';
import AppShell from '../app-shell';
import Footer from '@/components/static/footer';
import {useTranslations} from 'next-intl';


export default function AboutPage() {
    const t = useTranslations("about");
  return (
    <AppShell>
        <section className="max-w-4xl mx-auto px-4 py-16 space-y-10 mb-20">
            <img src="/logomasar.png" className='mb-15 max-h-35 mx-auto block'/>
            <div className="relative flex flex-col items-center mb-4 mt-8">
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.2,
                        ease: [0.42, 0, 0.58, 1], // this is "easeInOut"
                    }}
                    className="-mt-12 z-20 opacity-65 mb-0"
                ><GiPlatform className="h-20 w-20 text-[#e85f5e]" />
                </motion.div>

                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.4,
                        ease: [0.42, 0, 0.58, 1], // easeInOut
                    }}
                    className="-mt-14 z-10 opacity-20 mb-0"
                ><GiPlatform className="h-20 w-20 text-[#e85f5e]" />
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <h1 className="text-4xl font-bold mb-4 text-[#1e547c]">{t("abouto")}</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t("masaristrusted")} <strong className='text-[#e85f5e]'>{t("yearsof")}</strong>.
                {t("wehelp")}<strong className='text-[#e85f5e]'>{t("smartdigital")} </strong>
                {t("thatmakes")}
                </p>
            </motion.div>

            <Separator />

            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-4"
            >
                <h2 className="text-2xl font-semibold text-[#103c5c]">{t("OurVision")}</h2>
                <p className="text-muted-foreground text-base">{t("Tobecomethe")}</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-4"
            >
                <h2 className="text-2xl font-semibold text-[#103c5c]">{t("ourMission")}</h2>
                <p className="text-muted-foreground text-base">{t("Tosimplify")}</p>
            </motion.div>
            <motion.a
                href="https://wa.me/+905434948414"
                className="btn bg-gradient-to-r from-[#e85f5e] to-[#103c5c] text-white px-6 py-3 rounded-sm mx-auto block w-fit"
                >{t("GetinTouch")}
            </motion.a>
        </section>
        <Footer/>
    </AppShell>
  );
}
