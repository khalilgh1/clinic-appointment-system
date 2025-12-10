// src/app/(public)/layout.js
import "../globals.css";
import NavbarWrapper from '@/components/layout/navbar/NavbarWrapper';
import Footer from '@/components/layout/footer/Footer';

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarWrapper />
      <main className="flex-1 w-full"> 
        {children}
      </main>
      <Footer />
    </div>
  );
}