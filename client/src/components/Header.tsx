import doctorPhoto from '../assets/images/dra-larissa-freitas.jpg';

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  
  return (
    <header className={`flex flex-col items-center space-y-4 sm:space-y-6 ${className}`}>
      {/* Doctor Photo Section */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-serenity-rose/20 to-serenity-wine/20 p-1 shadow-xl">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              <img 
                src={doctorPhoto}
                alt="Dra. Larissa Freitas - Ginecologista e Obstetra"
                className="w-full h-full object-cover rounded-full"
                data-testid="doctor-photo"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Doctor Presentation */}
      <div className="text-center space-y-1 sm:space-y-2">
        <h1 
          className="font-playfair text-2xl sm:text-3xl font-bold text-serenity-text" 
          data-testid="doctor-name"
        >
          Dra. Larissa Freitas
        </h1>
        <h2 
          className="font-montserrat text-base sm:text-lg text-serenity-text-secondary font-medium" 
          data-testid="doctor-specialty"
        >
          Ginecologia e Obstetrícia
        </h2>
        <p 
          className="font-montserrat text-xs sm:text-sm text-serenity-text-secondary leading-relaxed px-2 sm:px-4" 
          data-testid="doctor-services"
        >
          Pré-natal de Alto Risco • Consulta Pré-concepcional • Assistência Humanizada
        </p>
      </div>
    </header>
  );
}