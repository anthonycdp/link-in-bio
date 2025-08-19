import Header from "@/components/Header";
import ClinicSection from "@/components/ClinicSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-serenity-bg flex items-center justify-center p-3 sm:p-4 py-4 sm:py-8">
      <div className="max-w-md w-full space-y-4 sm:space-y-8">
        
        {/* Header with Doctor Photo and Presentation */}
        <Header />

        {/* Clínica Ella Section */}
        <ClinicSection 
          clinicName="Clínica Ella"
          whatsappNumber="+5512982701791"
          whatsappMessage="Olá! Gostaria de agendar uma consulta com a Dra. Larissa Freitas."
          uberCoordinates={{
            latitude: -23.217326,
            longitude: -45.8906151
          }}
          googleMapsUrl="https://maps.google.com/?q=-23.217326,-45.8906151&z=17"
          address="Av. Andrômeda, 227 - Vale Sul Shopping, SUC 253/254, Jardim Satélite, São José dos Campos - SP, 12230-000"
        />

        {/* CEAME Section */}
        <ClinicSection 
          clinicName="CEAME"
          whatsappNumber="+5512988064303"
          whatsappMessage="Olá! Gostaria de agendar uma consulta com a Dra. Larissa Freitas."
          uberCoordinates={{
            latitude: -23.3052117,
            longitude: -45.9759764
          }}
          googleMapsUrl="https://maps.google.com/?q=-23.3052117,-45.9759764&z=17"
          address="R. Batista Scavone, 169 - Jardim Leonidia, Jacareí - SP, 12327-130"
        />

      </div>
    </div>
  );
}
