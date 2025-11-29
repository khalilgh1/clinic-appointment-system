import { Mail, Phone, Facebook, Instagram } from 'lucide-react';

export default function FooterContact() {
  const contactInfo = [
    {
      icon: Phone,
      label: 'Téléphone',
      href: 'tel:+213XXXXXXXXX',
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:contact@fertival.dz',
    },
    {
      icon: Facebook,
      label: 'Facebook',
      href: 'https://facebook.com/fertival',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://instagram.com/fertival',
    },
  ];

  return (
    <div className="animate-fade-in-up animation-delay-300">
      <h3 className="text-lg font-semibold mb-5 text-white">
        Contact
      </h3>
      
      {/* Contact Icons */}
      <div className="flex flex-wrap gap-3">
        {contactInfo.map((contact, index) => {
          const Icon = contact.icon;
          const isExternal = contact.icon === Facebook || contact.icon === Instagram;

          return (
            <a
              key={index}
              href={contact.href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#064045] hover:bg-gray-100 transition-all duration-300 hover:scale-110 hover:shadow-lg group"
              aria-label={contact.label}
              title={contact.label}
            >
              <Icon
                size={20}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:rotate-12"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}