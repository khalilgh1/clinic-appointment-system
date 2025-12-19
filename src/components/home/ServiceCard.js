import Link from "next/link";
export default function ServiceCard({ icon, title, description, id }) {
  return (
    <div
      style={{
        backgroundColor: '#F5F7F8',
        width: '100%',
        minWidth: '280px',
        maxWidth: '405px',
        minHeight: '276px',
        borderRadius: '24px',
        padding: 'clamp(1.5rem, 4vw, 2rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
      }}
    >
      {/* Top icon */}
      <div
        style={{
          width: 'clamp(48px, 5vw, 56px)',
          height: 'clamp(48px, 5vw, 56px)',
          borderRadius: '16px',
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <img
          src={icon}
          alt={title}
          style={{ width: '65%', height: '65%', objectFit: 'contain' }}
        />
      </div>

      {/* Text */}
      <div style={{ marginTop: '1rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h3
          style={{
            fontSize: 'clamp(18px, 2.5vw, 22px)',
            color: '#010B0C',
            fontFamily: 'Roboto, sans-serif',
            margin: '0 0 0.5rem 0',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 'clamp(13px, 1.8vw, 14px)',
            color: '#707677',
            fontFamily: 'Roboto, sans-serif',
            margin: 0,
            lineHeight: '1.5',
          }}
        >
          {description}
        </p>
      </div>

      {/* Button */}
      <Link href={`/services/${id}`} passHref>
      <button
        style={{
          fontSize: 'clamp(13px, 1.8vw, 14px)',
          color: 'var(--color-primary)',
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          textAlign: 'left',
          marginTop: '1rem',
        }}
      >
        En savoir plus →
      </button>
      </Link>
    </div>
  );
}
