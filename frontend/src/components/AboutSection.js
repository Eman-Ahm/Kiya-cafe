import { useState } from 'react';
import { Link } from 'react-router-dom';
import { colors } from '../theme';
import aboutImg from '../assets/beaf-pizza.jpg';

const team = [
  { name: 'Chef Kiya', role: 'Head Chef & Founder', emoji: '👨‍🍳' },
  { name: 'Liya T.', role: 'Pastry & Desserts', emoji: '🎂' },
  { name: 'Dawit M.', role: 'Grill Master', emoji: '🔥' },
];

function TeamCard({ member }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? '#2e2e2e' : '#252525',
        border: `1px solid ${hovered ? colors.orange : '#333'}`,
        borderRadius: '16px',
        padding: '24px 20px',
        textAlign: 'center',
        transition: 'all 0.25s ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 12px 30px rgba(0,0,0,0.3)' : 'none',
        flex: 1,
        minWidth: '140px',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: hovered ? colors.orange + '22' : '#333',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          margin: '0 auto 14px',
          border: `2px solid ${hovered ? colors.orange : '#444'}`,
          transition: 'all 0.25s ease',
        }}
      >
        {member.emoji}
      </div>
      <h4 style={{ color: 'white', margin: '0 0 4px', fontSize: '15px', fontWeight: '600' }}>
        {member.name}
      </h4>
      <p style={{ color: colors.orange, fontSize: '12px', margin: 0, fontWeight: '500' }}>
        {member.role}
      </p>
    </div>
  );
}

function AboutSection() {
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <section id="about" style={{ backgroundColor: colors.navDark, color: 'white', padding: '90px 40px' }}>
      {/* Story Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '60px',
          flexWrap: 'wrap',
          maxWidth: '1100px',
          margin: '0 auto 70px',
        }}
      >
        <img
          src={aboutImg}
          alt="Kiya Cafe kitchen"
          style={{
            width: '420px',
            maxWidth: '100%',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          }}
        />
        <div style={{ flex: 1, minWidth: '280px' }}>
          <span style={{ color: colors.orange, letterSpacing: '2px', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>
            Our Story
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontSize: '36px',
              margin: '10px 0 20px',
            }}
          >
            We Are Kiya Cafe
          </h2>
          <p style={{ color: '#bbb', lineHeight: '1.85', marginBottom: '16px', fontSize: '15px' }}>
            Kiya Cafe started with a simple idea: bring people together over great food. From handcrafted burgers to wood-fired pizza, every dish is made with fresh ingredients and a lot of care.
          </p>
          <p style={{ color: '#999', lineHeight: '1.85', marginBottom: '28px', fontSize: '14px' }}>
            Whether you're stopping by for a quick bite or a full meal with friends and family, our kitchen is always ready to serve something truly delicious.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '36px', flexWrap: 'wrap', marginBottom: '30px' }}>
            {[
              { value: '10+', label: 'Signature Dishes' },
              { value: '500+', label: 'Happy Customers' },
              { value: '5+', label: 'Years of Taste' },
            ].map(({ value, label }) => (
              <div key={label}>
                <h3 style={{ color: colors.orange, margin: '0 0 4px', fontSize: '28px', fontWeight: '800' }}>
                  {value}
                </h3>
                <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>

          <Link
            to="/book-table"
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            style={{
              backgroundColor: btnHovered ? '#e0941a' : colors.orange,
              color: colors.navDark,
              padding: '12px 28px',
              borderRadius: '25px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '14px',
              display: 'inline-block',
              transition: 'background-color 0.2s ease, transform 0.2s ease',
              transform: btnHovered ? 'translateY(-2px)' : 'none',
            }}
          >
            Reserve Your Table →
          </Link>
        </div>
      </div>

      {/* Team Row */}
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span style={{ color: colors.orange, letterSpacing: '2px', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>
            The People Behind the Food
          </span>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '28px', margin: '8px 0 0' }}>
            Meet Our Team
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {team.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
