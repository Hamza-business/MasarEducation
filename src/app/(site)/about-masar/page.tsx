'use client';

import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { GiPlatform } from 'react-icons/gi';
import AppShell from '../app-shell';
import Footer from '@/components/static/footer';

const floatWave = (delay = 0, offset = 10) => ({
  animate: {
    y: [0, -offset, 0, offset, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    },
  },
});


export default function AboutPage() {
  return (
    <AppShell>
        <section className="max-w-4xl mx-auto px-4 py-16 space-y-10 mb-20">
            <img src="/logomasar.png" className='mb-15 max-h-35 mx-auto block'/>
            <div className="relative flex flex-col items-center mb-4 mt-8">
                <motion.div
                    {...floatWave(0.2, 20)}
                    className="-mt-12 z-20 opacity-65 mb-0"
                ><GiPlatform className="h-20 w-20 text-[#e85f5e]" />
                </motion.div>

                <motion.div
                    {...floatWave(0.4, 10)}
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
                <h1 className="text-4xl font-bold mb-4 text-[#1e547c]">About Masar</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Masar is a trusted educational and consultancy company with over <strong className='text-[#e85f5e]'>8 years of experience</strong>.
                We help international students and residents in Turkey by offering a <strong className='text-[#e85f5e]'>smart digital platform </strong>
                that makes it easy to access essential services — all in one place.
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
                <h2 className="text-2xl font-semibold text-[#103c5c]">🎯Our Vision</h2>
                <p className="text-muted-foreground text-base">
                To become the go-to digital platform for every international student or resident in Turkey
                who needs fast, reliable, and professional support.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-4"
            >
                <h2 className="text-2xl font-semibold text-[#103c5c]">🚀Our Mission</h2>
                <p className="text-muted-foreground text-base">
                To simplify life for foreigners in Turkey by automating key services and providing expert assistance
                24/7 — with full transparency, safety, and care.
                </p>
            </motion.div>
            <motion.a
                href="https://wa.me/+905434948414"
                className="btn bg-gradient-to-r from-[#e85f5e] to-[#103c5c] text-white px-6 py-3 rounded-sm mx-auto block w-fit"
                >Get in Touch
            </motion.a>
        </section>
        <Footer/>
    </AppShell>
  );
}
