// src/app/(public)/layout.js
import "../globals.css";

export default function PublicLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
