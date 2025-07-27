'use client';
import { GraduationCap, FileCheck, MapPin, Heart } from "lucide-react";
import ServiceCard from "@/components/landing/ServiceCard";
// import { useNavigate } from "react-router-dom";
import AppShell from "./app-shell";
import Footer from "@/components/static/footer";
import { usePathname, useRouter } from 'next/navigation';
import {useTranslations} from 'next-intl';

const Landing = () => {
  const pth = usePathname();
  const t = useTranslations("services2");

  function handleWhatsAppRedirect (service: string): string{
    let message = "";
    let phoneNumber = "+1234567890"; // Replace with actual WhatsApp number
    
    switch (service) {
      case "university":
        phoneNumber = "+905074332296"
        message = "I’d like to apply for a university!";
        break;
      case "certificate":
        phoneNumber = "+905076378139"
        message = "I’d like to apply for my certificate accreditation!";
        break;
      case "residence":
        phoneNumber = "+905434948414"
        message = "I’d like to apply for my residence permit!";
        break;
    }
    
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const services = [
    {
      icon: Heart,
      title: "healthInsurance",
      link: `${pth == "/" ? "/insurance"  : `/${pth}/insurance`}`,
      isPrimary: true
    },
    {
      icon: GraduationCap,
      title: "ApplyUni",
      link: handleWhatsAppRedirect("university"),
      isPrimary: false
    },
    {
      icon: FileCheck,
      title: "CertiEquiv",
      link: handleWhatsAppRedirect("certificate"),
      isPrimary: false
    },
    {
      icon: MapPin,
      title: "ResidPerm",
      link: handleWhatsAppRedirect("residence"),
      isPrimary: false
    }
  ];
    const services2 = [
    {
      icon: Heart,
      title: "healthInsurance",
      link: `${pth == "/" ? "/insurance"  : `${pth}/insurance`}`,
      isPrimary: true
    },
    {
      icon: FileCheck,
      title: "CertiEquiv",
      link: handleWhatsAppRedirect("certificate"),
      isPrimary: false
    },
    {
      icon: MapPin,
      title: "ResidPerm",
      link: handleWhatsAppRedirect("residence"),
      isPrimary: false
    },
    {
      icon: GraduationCap,
      title: "ApplyUni",
      link: handleWhatsAppRedirect("university"),
      isPrimary: false
    }
  ];

  return (
    <AppShell>
        <div className="min-h-screen bg-gradient-subtle">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-6xl mx-auto sm:hidden">
                    {services.map((service, index) => (
                        <div
                          key={index}
                          className={`
                            ${index === 0 || index === services.length - 1 
                              ? 'sm:col-span-2 col-span-1' // full width for first and last
                              : 'col-span-1'              // default half-width for 2nd & 3rd
                            }
                          `}
                        >
                            <ServiceCard
                              icon={service.icon}
                              title={service.title}
                              link={service.link}
                              isPrimary={service.isPrimary}
                            />
                        </div>
                    ))}
                </div>
                <div className="grid-cols-1 md:grid-cols-2 gap-5 max-w-6xl mx-auto hidden sm:grid">
                    {services2.map((service, index) => (
                        <div
                          key={index}
                          className={`
                            ${index === 0 || index === services.length - 1 
                              ? 'sm:col-span-2 col-span-1' // full width for first and last
                              : 'col-span-1'              // default half-width for 2nd & 3rd
                            }
                          `}
                        >
                            <ServiceCard
                              icon={service.icon}
                              title={service.title}
                              link={service.link}
                              isPrimary={service.isPrimary}
                            />
                        </div>
                    ))}
                </div>


                {/* Additional Info */}
                <div className="text-center mt-16">
                    <p className="text-masar-navy/60 mb-6">
                      {t("ndhelp")}
                    </p>
                </div>
            </div>
        </div>
        <Footer/>
    </AppShell>
  );
};

export default Landing;









// 'use client';
// import AppShell from "@/app/(site)/app-shell"
// import HeroHome from "../../components/landing/hero-home";
// import Features from "../../components/landing/features";
// import Workflows from "../../components/landing/workflows";
// import Footer from "@/components/static/footer";
// import { Separator } from '@/components/ui/separator';

// export default function Home() {    
//   return (
//     <AppShell>
//       <HeroHome/>
//       <div style={{width: "70%", minWidth: "270px"}} className="mx-auto">
//         <Separator />
//       </div>
//       <Workflows/>
//       <div style={{width: "70%", minWidth: "270px"}} className="mx-auto">
//         <Separator />
//       </div>
//       <Features/>
//       {/* <Cta/> */}
//       <Footer/>
//     </AppShell>
//   )
// }

// #103c5c
// #e85f5e
// #e9e9e9