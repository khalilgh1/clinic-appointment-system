export default function SectionTitle({ titleStart, titleEnd, description }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '826px', marginLeft: 'auto', marginRight: 'auto' }}>
      <h2
        style={{
          fontSize: '58px',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 700,
          margin: 0,
          lineHeight: 1.1,
          wordWrap: 'break-word', // wrap long words
        }}
      >
        {titleStart}{' '}
        <span
          style={{
            fontFamily: 'var(--font-pacifico)',
            color: 'var(--color-primary)',
          }}
        >
          {titleEnd}
        </span>
      </h2>

      <p
        style={{
          marginTop: '1rem',
          fontSize: '16px',
          color: '#707677',
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        {description}
      </p>
    </div>
  );
}
