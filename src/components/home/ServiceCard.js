export default function ServiceCard({ icon, title, description }) {
  return (
    <div
      style={{
        backgroundColor: '#F5F7F8',
        width: '405px',
        height: '276px',
        borderRadius: '24px',
        padding: '2rem', // more inner spacing
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Top icon */}
      <div
        style={{
          width: '56px',          // slightly bigger
          height: '56px',
          borderRadius: '16px',
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={icon}
          alt={title}
          style={{ width: '65%', height: '65%' }} // fit nicely
        />
      </div>

      {/* Text */}
      <div style={{ marginTop: '1rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h3
          style={{
            fontSize: '22px',
            color: '#010B0C',
            fontFamily: 'Roboto, sans-serif',
            margin: '0 0 0.5rem 0',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: '14px',
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
      <button
        style={{
          fontSize: '14px',
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
    </div>
  );
}
