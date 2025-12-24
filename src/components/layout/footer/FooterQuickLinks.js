/**
 * Footer Quick Links
 * 
 * Renders a list of essential navigation links in the footer.
 * Provides users with easy access to the Home, About, Doctors, and Services pages.
 */
import Link from 'next/link';

export default function FooterQuickLinks() {
  const quickLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'À propos de nous', href: '/about' },
    { name: 'Médecins', href: '/Doctor' },
    { name: 'Services', href: '/services' },
  ];

  return (
    <div className="animate-fade-in-up animation-delay-100">
      <h3 className="text-lg text-bold font-semibold mb-5 text-white">
        Liens rapides
      </h3>
      <ul className="space-y-3">
        {quickLinks.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="text-sm text-gray-300 hover:text-white transition-all duration-300 inline-block relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}