import { Link } from 'react-router-dom';
import { useState } from 'react';
import { colors } from '../theme';
import heroImg from '../assets/beef-burger.jpg';

function Hero() {
  const [btnHovered, setBtnHovered] = useState(false);
  const [bookHovered, setBookHovered] = useState(false);

  return (
    <div
      style={{
        backgroundColor: colors.navDark,
        color: 'white',
        padding: '80px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '40px',
      }}
    >
      <div style={{ maxWidth: '480px' }}>
        {/* Eyebrow */}
        <span
          style={{
            color: colors.orange,
            letterSpacing: '3px',
            fontSize: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
          }}
        >
          Welcome to Kiya Cafe
        </span>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: '46px',
            lineHeight: '1.2',
            margin: '12px 0 18px',
          }}
        >
          Great Food,<br />Great Moments
        </h1>

        <p style={{ color: '#aaa', marginBottom: '32px', lineHeight: '1.8', fontSize: '15px' }}>
          Fresh burgers, wood-fired pizzas, crispy shawarmas and more — made
          with care every single day. Come dine with us.
        </p>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          {/* Primary CTA */}
          <Link
            to="/book-table"
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            style={{
              backgroundColor: btnHovered ? '#e0941a' : colors.orange,
              color: colors.navDark,
              padding: '13px 30px',
              borderRadius: '28px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '14px',
              transition: 'background-color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease',
              transform: btnHovered ? 'translateY(-2px)' : 'none',
              boxShadow: btnHovered ? '0 8px 20px rgba(245,166,35,0.45)' : 'none',
              display: 'inline-block',
            }}
          >
            Book a Table 🍽️
          </Link>

          {/* Secondary CTA */}
          <Link
            to="/menu"
            onMouseEnter={() => setBookHovered(true)}
            onMouseLeave={() => setBookHovered(false)}
            style={{
              backgroundColor: 'transparent',
              color: bookHovered ? colors.orange : 'white',
              padding: '13px 30px',
              borderRadius: '28px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '14px',
              border: `2px solid ${bookHovered ? colors.orange : '#555'}`,
              transition: 'all 0.25s ease',
              display: 'inline-block',
            }}
          >
            View Menu
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div style={{ position: 'relative' }}>
        <img
          src={heroImg}
          alt="Kiya Cafe food"
          style={{
            width: '420px',
            maxWidth: '100%',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        />
        {/* Floating badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '-20px',
            backgroundColor: colors.orange,
            color: colors.navDark,
            padding: '12px 18px',
            borderRadius: '14px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
            fontWeight: '700',
            fontSize: '13px',
          }}
        >
          🌟 Dine-in Experience
        </div>
      </div>
    </div>
  );
}

export default Hero;
