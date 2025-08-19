import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Car, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import WhatsAppIcon from './WhatsAppIcon';
import UberIcon from './icons/UberIcon';
import NinetyNineIcon from './icons/NinetyNineIcon';
import GoogleMapsIcon from './icons/GoogleMapsIcon';

interface ClinicSectionProps {
  clinicName: string;
  whatsappNumber: string;
  whatsappMessage: string;
  uberCoordinates: {
    latitude: number;
    longitude: number;
  };
  googleMapsUrl: string;
  address: string;
  className?: string;
}

// Device detection utility
const detectDevice = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return {
    isIOS: /iphone|ipad|ipod/.test(userAgent),
    isAndroid: /android/.test(userAgent),
    isMobile: /mobile|android|iphone|ipad|ipod/.test(userAgent)
  };
};

export default function ClinicSection({
  clinicName,
  whatsappNumber,
  whatsappMessage,
  uberCoordinates,
  googleMapsUrl,
  address,
  className = ""
}: ClinicSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // CKDEV-NOTE: Centralized message for reusability across WhatsApp and contact modals
  const DEFAULT_MSG = "Olá, gostaria de agendar uma consulta com a Dra. Larissa Freitas";
  
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleWhatsAppClick = async () => {
    setIsLoading(true);
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(DEFAULT_MSG);
    const whatsappWebUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    
    try {
      const newWindow = window.open(whatsappWebUrl, '_blank');
      
      // CKDEV-NOTE: Fallback mechanism for blocked popups or failed WhatsApp launch
      setTimeout(async () => {
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          const copied = await copyToClipboard(DEFAULT_MSG);
          
          toast({
            title: "WhatsApp não abriu?",
            description: copied 
              ? "A mensagem foi copiada para sua área de transferência. Cole no WhatsApp!"
              : `Use esta mensagem: "${DEFAULT_MSG}"`,
            duration: 5000,
          });
        }
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      const copied = await copyToClipboard(DEFAULT_MSG);
      
      toast({
        title: "WhatsApp não disponível",
        description: copied 
          ? "A mensagem foi copiada! Abra o WhatsApp e cole a mensagem."
          : `Copie esta mensagem: "${DEFAULT_MSG}"`,
        duration: 5000,
      });
      setIsLoading(false);
    }
  };

  const handleUberClick = () => {
    const device = detectDevice();
    const { latitude, longitude } = uberCoordinates;
    
    if (device.isMobile) {
      // Try app scheme first
      const uberAppUrl = `uber://riderequest?pickup=my_location&dropoff[latitude]=${latitude}&dropoff[longitude]=${longitude}&dropoff[nickname]=${encodeURIComponent(clinicName)}&dropoff[formatted_address]=${encodeURIComponent(address)}`;
      
      // Fallback to web URL
      const uberWebUrl = `https://m.uber.com/looking?pickup=my_location&dropoff[latitude]=${latitude}&dropoff[longitude]=${longitude}`;
      
      // Try app first, fallback to web
      window.location.href = uberAppUrl;
      setTimeout(() => {
        window.open(uberWebUrl, '_blank');
      }, 1000);
    } else {
      const uberWebUrl = `https://m.uber.com/looking?pickup=my_location&dropoff[latitude]=${latitude}&dropoff[longitude]=${longitude}`;
      window.open(uberWebUrl, '_blank');
    }
  };

  const handle99Click = () => {
    const device = detectDevice();
    
    if (device.isIOS) {
      window.open('https://apps.apple.com/br/app/99-corridas-food-pay/id553663691', '_blank');
    } else if (device.isAndroid) {
      window.open('https://play.google.com/store/apps/details?id=com.taxis99', '_blank');
    } else {
      window.open('https://99app.com/', '_blank');
    }
  };

  const handleGoogleMapsClick = () => {
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <>
      <section className={`space-y-3 sm:space-y-4 ${className}`}>
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-serenity-rose/10">
          <h2 
            className="font-montserrat text-lg sm:text-xl font-semibold text-serenity-text mb-2 sm:mb-3 text-center" 
            data-testid={`clinic-${clinicName.toLowerCase().replace(/\s+/g, '-')}-title`}
          >
            {clinicName}
          </h2>
          
          {/* Address display */}
          <button
            onClick={handleGoogleMapsClick}
            className="group flex items-start justify-center space-x-2 mb-3 sm:mb-4 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-gray-50 transition-all duration-300 w-full text-center"
            data-testid={`address-${clinicName.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <MapPin className="w-4 h-4 text-gray-500 group-hover:text-serenity-rose transition-colors duration-300 flex-shrink-0 mt-0.5" />
            <p className="font-montserrat text-xs sm:text-sm text-gray-600 group-hover:text-serenity-rose transition-colors duration-300 leading-relaxed text-left">
              {address}
            </p>
          </button>
          
          {/* Primary appointment button */}
          <button
            onClick={handleWhatsAppClick}
            disabled={isLoading}
            className="group relative w-full bg-gradient-to-r from-serenity-rose to-serenity-wine hover:from-serenity-wine hover:to-serenity-rose text-white font-montserrat font-semibold py-3 sm:py-5 px-6 sm:px-8 rounded-2xl text-center transition-all duration-300 mb-4 sm:mb-6 shadow-lg hover:shadow-xl transform hover:scale-105 hover:brightness-110 text-base sm:text-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
            data-testid={`button-schedule-${clinicName.toLowerCase().replace(/\s+/g, '-')}`}
            aria-label={`Agendar consulta com Dra. Larissa Freitas ${clinicName === 'Clínica Ella' ? 'na' : 'no'} ${clinicName}. Mensagem: ${DEFAULT_MSG}`}
          >
            <span className="relative z-10 flex items-center justify-center space-x-2 sm:space-x-3">
              {isLoading ? (
                <Loader2 className="animate-spin w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <WhatsAppIcon size="20" className="text-white sm:w-6 sm:h-6" />
              )}
              <span>{isLoading ? 'Abrindo WhatsApp...' : `Agendar ${clinicName === 'Clínica Ella' ? 'na' : 'no'} ${clinicName}`}</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
          </button>
          
          {/* Location and directions links */}
          <div className="flex justify-center space-x-2 sm:space-x-4">
            <button
              onClick={handleGoogleMapsClick}
              className="group flex items-center gap-1.5 sm:gap-2 bg-gray-50 hover:bg-serenity-rose/10 text-gray-600 hover:text-serenity-rose px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-montserrat font-medium text-xs sm:text-sm transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md cursor-pointer border border-gray-200 hover:border-serenity-rose/30"
              data-testid={`link-location-${clinicName.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-300" />
              <span>Ver Localização</span>
            </button>
            <button 
              onClick={openModal}
              className="group flex items-center gap-1.5 sm:gap-2 bg-gray-50 hover:bg-serenity-rose/10 text-gray-600 hover:text-serenity-rose px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-montserrat font-medium text-xs sm:text-sm transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md cursor-pointer border border-gray-200 hover:border-serenity-rose/30"
              data-testid={`button-directions-${clinicName.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Car className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-300" />
              <span>Como Chegar</span>
            </button>
          </div>
        </div>
      </section>

      {/* Transportation Modal */}
      <Dialog open={modalOpen} onOpenChange={closeModal}>
        <DialogContent className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-[calc(100%-2rem)] mx-auto shadow-2xl border-0" data-testid="modal-directions">
          <DialogHeader className="mb-4">
            <DialogTitle className="font-playfair text-xl sm:text-2xl font-bold text-serenity-text mb-2" data-testid="modal-title">
              Como chegar?
            </DialogTitle>
            <p className="font-montserrat text-xs sm:text-sm text-serenity-text-secondary">
              Escolha seu meio de transporte preferido
            </p>
          </DialogHeader>
          
          {/* Clinic Address */}
          <div className="bg-serenity-bg rounded-xl p-3 sm:p-4 mb-4">
            <h3 className="font-montserrat font-semibold text-sm sm:text-base text-serenity-text mb-1">{clinicName}</h3>
            <p className="font-montserrat text-xs sm:text-sm text-serenity-text-secondary leading-relaxed">{address}</p>
          </div>
          
          {/* Transportation options */}
          <div className="space-y-2 sm:space-y-3">
            <button
              onClick={handleUberClick}
              className="group relative w-full bg-black hover:bg-gray-800 text-white font-montserrat font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl text-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] sm:hover:scale-105 hover:opacity-90"
              data-testid="button-uber"
            >
              <span className="flex items-center justify-center gap-2 sm:gap-3">
                <UberIcon size={20} className="text-white sm:w-6 sm:h-6" />
                <span className="text-sm sm:text-base">Abrir no Uber</span>
              </span>
            </button>
            
            <button
              onClick={handle99Click}
              className="group relative w-full bg-yellow-400 hover:bg-yellow-300 text-black font-montserrat font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl text-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] sm:hover:scale-105 hover:opacity-90"
              data-testid="button-99"
            >
              <span className="flex items-center justify-center gap-2 sm:gap-3">
                <NinetyNineIcon size={20} className="text-black sm:w-6 sm:h-6" />
                <span className="text-sm sm:text-base">Abrir no 99</span>
              </span>
            </button>
            
            <button
              onClick={handleGoogleMapsClick}
              className="group relative w-full bg-gradient-to-r from-blue-500 via-green-500 to-red-500 hover:from-blue-600 hover:via-green-600 hover:to-red-600 text-white font-montserrat font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl text-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] sm:hover:scale-105 hover:opacity-90"
              data-testid="button-gmaps"
            >
              <span className="flex items-center justify-center gap-2 sm:gap-3">
                <GoogleMapsIcon size={20} className="sm:w-6 sm:h-6" />
                <span className="text-sm sm:text-base">Ver no Google Maps</span>
              </span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}