'use client';
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";

const FloatingWhatsApp = () => {
  const handleWhatsAppClick = () => {
    const message = "Hello! I need assistance with Masar Education services.";
    const phoneNumber = "+905434948414"; // Replace with actual WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      size="icon"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-float hover:shadow-lg hover:scale-105 transition-all duration-300 bg-green-400 hover:bg-green-500"
    >
      <FaWhatsapp className="h-8 w-8 size-5" size={5} />
    </Button>
  );
};

export default FloatingWhatsApp;