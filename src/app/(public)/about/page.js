import React from 'react';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#064045] rounded-3xl mx-2 sm:mx-5 mt-5 overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.02]" />
        
        <div className="relative px-4 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 md:py-20">
          {/* Hero Content */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-4 sm:mb-5">
              Bienvenue a <span style={{fontFamily: 'var(--font-pacifico)', color: '#FFE273'}}>Fertival</span>
            </h1>
            
            <p className="text-white text-base sm:text-lg leading-relaxed opacity-90 px-2" style={{fontFamily: 'Arimo, sans-serif'}}>
              Une clinique spécialisée dans la fertilité et la procréation médicalement assistée (PMA). 
              Nous offrons un environnement rassurant, une expertise scientifique reconnue et une approche 
              profondément humaine.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-lg order-2 md:order-1">
            <img 
              src="/aboutus2.png" 
              alt="Mission" 
              className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover"
            />
          </div>
          
          <div className="order-1 md:order-2">
            <div className="inline-block bg-[#064045] text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6" style={{fontFamily: 'Arimo, sans-serif'}}>
              Notre Mission
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#010B0C] leading-tight mb-2">
              Votre parcours de fertilité,
            </h2>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#064045] mb-4 sm:mb-6" style={{fontFamily: 'var(--font-pacifico)'}}>
              notre priorité
            </h2>
            
            <p className="text-base sm:text-lg text-[#707677] leading-relaxed" style={{fontFamily: 'Arimo, sans-serif'}}>
              FERTIVAL est une clinique spécialisée dans la fertilité et la procréation médicalement assistée (PMA). 
              Nous offrons un environnement rassurant, une expertise scientifique reconnue et une approche 
              profondément humaine.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-[#F5F7F8] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="inline-block bg-[#064045] text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6" style={{fontFamily: 'Arimo, sans-serif'}}>
              Nos Valeurs
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium">
              <span className="text-[#010B0C]">Ce qui nous </span>
              <span className="text-[#064045]" style={{fontFamily: 'var(--font-pacifico)'}}>définit</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                title: 'Écoute',
                description: 'Une attention particulière à vos besoins et préoccupations'
              },
              {
                title: 'Excellence',
                description: 'Des soins de la plus haute qualité médicale'
              },
              {
                title: 'Empathie',
                description: 'Un accompagnement humain et bienveillant'
              },
              {
                title: 'Discrétion',
                description: 'Confidentialité et respect de votre vie privée'
              }
            ].map((value, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#064045]/10 rounded-full flex items-center justify-center mb-4 sm:mb-6 md:mb-8">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#064045] rounded-full" />
                </div>
                
                <h3 className="text-lg sm:text-xl text-[#010B0C] mb-2 sm:mb-3" style={{fontFamily: 'Arimo, sans-serif'}}>
                  {value.title}
                </h3>
                <p className="text-sm sm:text-base text-[#707677] leading-relaxed" style={{fontFamily: 'Arimo, sans-serif'}}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">          
          <div className="order-2 md:order-1">
            <div className="inline-block bg-[#064045] text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6" style={{fontFamily: 'Arimo, sans-serif'}}>
              Notre Approche
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#010B0C] mb-2">
              Un accompagnement
            </h2>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#064045] mb-4 sm:mb-6" style={{fontFamily: 'var(--font-pacifico)'}}>
              global
            </h2>
            
            <p className="text-base sm:text-lg text-[#707677] mb-6 sm:mb-8" style={{fontFamily: 'Arimo, sans-serif'}}>
              Notre approche associe :
            </p>
            
            <div className="space-y-3 sm:space-y-4">
              {[
                'Des spécialistes expérimentés',
                'Un plateau technique de dernière génération',
                'Un accompagnement global physique, émotionnel et médical'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-[#064045] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-[#010B0C]" style={{fontFamily: 'Arimo, sans-serif'}}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="rounded-3xl overflow-hidden shadow-lg order-1 md:order-2">
            <img 
              src="/aboutus1.png" 
              alt="Approach" 
              className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-[#F5F7F8] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="inline-block bg-[#064045] text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6" style={{fontFamily: 'Arimo, sans-serif'}}>
              Contact
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-3 sm:mb-4">
              <span className="text-[#010B0C]">Prenez </span>
              <span className="text-[#064045]" style={{fontFamily: 'var(--font-pacifico)'}}>contact avec nous</span>
            </h2>
            
            <p className="text-base sm:text-lg text-[#707677] px-2" style={{fontFamily: 'Arimo, sans-serif'}}>
              Chaque demande est traitée avec confidentialité et réactivité
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Contact Info */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl sm:text-2xl text-[#010B0C] mb-6 sm:mb-8" style={{fontFamily: 'Arimo, sans-serif'}}>
                Informations de contact
              </h3>
              
              <div className="space-y-6 sm:space-y-8 mb-6 sm:mb-8">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#064045]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#064045]" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-[#707677] mb-1" style={{fontFamily: 'Arimo, sans-serif'}}>Adresse</p>
                    <p className="text-sm sm:text-base text-[#010B0C]" style={{fontFamily: 'Arimo, sans-serif'}}>Boulevard du 11 Décembre 1960</p>
                    <p className="text-sm sm:text-base text-[#010B0C]" style={{fontFamily: 'Arimo, sans-serif'}}>El Biar, Alger</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#064045]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#064045]" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-[#707677] mb-1" style={{fontFamily: 'Arimo, sans-serif'}}>Téléphone</p>
                    <p className="text-sm sm:text-base text-[#010B0C]" style={{fontFamily: 'Arimo, sans-serif'}}>0560 00 61 71</p>
                    <p className="text-sm sm:text-base text-[#010B0C]" style={{fontFamily: 'Arimo, sans-serif'}}>021 98 31 60</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#064045]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#064045]" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-[#707677] mb-1" style={{fontFamily: 'Arimo, sans-serif'}}>WhatsApp</p>
                    <p className="text-sm sm:text-base text-[#010B0C]" style={{fontFamily: 'Arimo, sans-serif'}}>0560 00 61 71</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#064045]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#064045]" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-[#707677] mb-1" style={{fontFamily: 'Arimo, sans-serif'}}>Horaires</p>
                    <p className="text-sm sm:text-base text-[#010B0C]" style={{fontFamily: 'Arimo, sans-serif'}}>Dimanche – Jeudi</p>
                    <p className="text-sm sm:text-base text-[#010B0C]" style={{fontFamily: 'Arimo, sans-serif'}}>8h30 – 18h00</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 sm:pt-6">
                <p className="text-sm sm:text-base text-[#707677] mb-3 sm:mb-4" style={{fontFamily: 'Arimo, sans-serif'}}>
                  Rendez-vous disponibles :
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#064045]/10 text-[#064045] text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full" style={{fontFamily: 'Arimo, sans-serif'}}>
                    Sur place
                  </span>
                  <span className="bg-[#064045]/10 text-[#064045] text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full" style={{fontFamily: 'Arimo, sans-serif'}}>
                    En ligne
                  </span>
                  <span className="bg-[#064045]/10 text-[#064045] text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full" style={{fontFamily: 'Arimo, sans-serif'}}>
                    Téléconsultation
                  </span>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="bg-gray-200 rounded-3xl overflow-hidden shadow-sm h-[300px] sm:h-[400px] lg:h-full lg:min-h-[590px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.8944857683706!2d3.0449999999999995!3d36.7642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb26977171e51%3A0x37182f89ce0d3d84!2sEl%20Biar%2C%20Alger!5e0!3m2!1sen!2sdz!4v1234567890123!5m2!1sen!2sdz"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;