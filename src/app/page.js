import HomePage from "./(public)/HomePage";
import NavbarWrapper from '@/components/layout/navbar/NavbarWrapper';
import Footer from '@/components/layout/footer/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarWrapper />
      <main className="flex-1">
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}