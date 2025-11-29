export default function InfosSection() {
  return (
    <section
      style={{
        padding: '6rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '8rem',
      }}
    >

      {/* Row 1 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4rem',
          flexWrap: 'wrap',
        }}
      >
        <img
          src="/fertility.png"
          alt="Fertility"
          style={{
            flex: 1,
            borderRadius: '16px',
            objectFit: 'cover',
            minWidth: '340px',
          }}
        />

        <div style={{ flex: 1, minWidth: '340px' }}>
          <h2
            style={{
              fontSize: '58px',
              fontFamily: 'Roboto, sans-serif',
              lineHeight: '1.15',
              margin: 0,
              fontWeight: '700',
            }}
          >
            Notre expertise au service de votre{' '}
            <span
              style={{
                fontFamily: 'var(--font-pacifico)',
                color: 'var(--color-primary)',
              }}
            >
              fertilité
            </span>
          </h2>

          <ul
            style={{
              marginTop: '2rem',
              listStyle: 'none',
              padding: 0,
              fontFamily: 'Roboto, sans-serif',
              fontSize: '18px',
              lineHeight: '1.7',
              color: '#000000',
            }}
          >
            <li style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Fertilité & PMA</li>
            <li style={{ color: '#707677' }}>
              FIV, ICSI, IIU, stimulation ovarienne, préservation ovocytaire et spermatique.
            </li>

            <li style={{ color: 'var(--color-primary)', fontWeight: '600', marginTop: '1rem' }}>
              Médecine du couple
            </li>
            <li style={{ color: '#707677' }}>
              Approche conjointe homme/femme, accompagnement nutritionnel et psychologique.
            </li>

            <li style={{ color: 'var(--color-primary)', fontWeight: '600', marginTop: '1rem' }}>
              Endocrinologie
            </li>
            <li style={{ color: '#707677' }}>
              Troubles hormonaux, thyroïde, diabète, SOPK.
            </li>

            <li style={{ color: 'var(--color-primary)', fontWeight: '600', marginTop: '1rem' }}>
              Urologie & Andrologie
            </li>
            <li style={{ color: '#707677' }}>
              Bilan masculin, troubles érectiles, varicocèle, spermiogramme, micro-tese.
            </li>

            <li style={{ color: 'var(--color-primary)', fontWeight: '600', marginTop: '1rem' }}>
              Imagerie & Laboratoire
            </li>
            <li style={{ color: '#707677' }}>
              Examens, analyses hormonales, spermogrammes, échographies.
            </li>
          </ul>
        </div>
      </div>

      {/* Row 2 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: 1, minWidth: '340px' }}>
          <h2
            style={{
              fontSize: '58px',
              fontFamily: 'Roboto, sans-serif',
              lineHeight: '1.15',
              margin: 0,
              fontWeight: '700',
            }}
          >
            Présentation de{' '}
            <span
              style={{
                fontFamily: 'var(--font-pacifico)',
                color: 'var(--color-primary)',
              }}
            >
              Fertival
            </span>
          </h2>

          <p
            style={{
              marginTop: '1.5rem',
              fontSize: '18px',
              color: '#707677',
              lineHeight: '1.7',
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            FERTIVAL est une clinique spécialisée dans la fertilité et la procréation
            médicalement assistée (PMA). Nous offrons un environnement rassurant, une expertise
            scientifique reconnue et une approche profondément humaine. Nos valeurs : écoute –
            excellence – empathie – discrétion.
          </p>
        </div>

        <img
          src="/homeimg.png"
          alt="Docteur"
          style={{
            flex: 1,
            borderRadius: '16px',
            objectFit: 'cover',
            minWidth: '340px',
          }}
        />
      </div>

      {/* Row 3 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4rem',
          flexWrap: 'wrap',
        }}
      >
        <img
          src="/homeimg2.png"
          alt="Docteur"
          style={{
            flex: 1,
            borderRadius: '16px',
            objectFit: 'cover',
            minWidth: '340px',
          }}
        />

        <div style={{ flex: 1, minWidth: '340px' }}>
          <h2
            style={{
              fontSize: '58px',
              fontFamily: 'Roboto, sans-serif',
              lineHeight: '1.15',
              margin: 0,
              fontWeight: '700',
            }}
          >
            Pourquoi{' '}
            <span
              style={{
                fontFamily: 'var(--font-pacifico)',
                color: 'var(--color-primary)',
              }}
            >
              nous choisir
            </span>
          </h2>

          <p
            style={{
              marginTop: '1.5rem',
              fontSize: '18px',
              color: '#707677',
              lineHeight: '1.7',
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            Bienvenue à FERTIVAL, la clinique de la fertilité et de la santé de la femme à Alger.
            Notre mission : offrir à chaque couple une prise en charge complète, humaine et
            efficace vers la concrétisation du rêve de devenir parents.
          </p>
        </div>
      </div>
    </section>
  );
}
