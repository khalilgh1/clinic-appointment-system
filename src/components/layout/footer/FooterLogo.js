import Link from 'next/link';
import Image from 'next/image';

export default function FooterLogo() {
  return (
    <div className="animate-fade-in-up">
      <Link href="/" className="inline-block group mt-[-10px]">
        <div className="w-32 h-32 md:w-36 md:h-36 flex items-center justify-center overflow-hidden bg-transparent">
          <Image
            src="/logofooter.png"
            width={140}
            height={140}
            alt="Clinique PMA Fertival"
            className="object-contain max-w-full max-h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <p className="text-lg text-gray-300 leading-relaxed max-w-xs">
        Nous offrons des informations de santé fiables, des conseils d'experts et des outils numériques pour vous accompagner tout au long de votre parcours.
      </p>
    </div>
  );
}