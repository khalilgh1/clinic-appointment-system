// src/app/(public)/layout.js
import "../globals.css";
import NavbarWrapper from '@/components/layout/navbar/NavbarWrapper';
import Footer from '@/components/layout/footer/Footer';
export default function PublicLayout({ children }) {
  return <>
        <NavbarWrapper />
        {children}
        <Footer />
  </>;
}
