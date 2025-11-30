//import MedicalBookingPage from "./(public)/(appoint)/appoint_sidebar";
import HomePage from "./(public)/HomePage";
import NavbarWrapper from '@/components/layout/navbar/NavbarWrapper';
import Footer from '@/components/layout/footer/Footer';
export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <NavbarWrapper />
      <HomePage />
      <Footer />

    </div>
  );
}
