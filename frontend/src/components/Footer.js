import { Link } from 'react-router-dom';
import { colors } from '../theme';
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { useState } from 'react';

const SocialIcon = ({ href, children, label }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: hovered ? colors.orange : '#2a2a2a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: hovered ? colors.navDark : 'white',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.25s ease, color 0.25s ease, transform 0.2s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        textDecoration: 'none',
        border: `1px solid ${hovered ? colors.orange : '#333'}`,
      }}
    >
      {children}
    </a>
  );
};

const FooterLink = ({ to, href, children }) => {
  const [hovered, setHovered] = useState(false);
  const style = {
    display: 'block',
    color: hovered ? colors.orange : '#999',
    fontSize: '13px',
    textDecoration: 'none',
    marginBottom: '10px',
    transition: 'color 0.2s ease, padding-left 0.2s ease',
    paddingLeft: hovered ? '6px' : '0',
  };

  if (to) {
    return (
      <Link
        to={to}
        style={style}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
};

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: colors.navDark,
        color: 'white',
        padding: '60px 40px 28px',
        borderTop: '1px solid #222',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '36px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {/* Brand */}
        <div style={{ maxWidth: '280px' }}>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              color: colors.orange,
              marginBottom: '12px',
              fontSize: '22px',
            }}
          >
            Kiya Cafe
          </h3>
          <p style={{ color: '#999', fontSize: '13px', lineHeight: '1.8' }}>
            Great food, made fresh every day. Visit us for burgers, pizza,
            shawarma and more — or book your table online.
          </p>
          {/* Social row */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <SocialIcon href="https://facebook.com" label="Facebook">
              <FaFacebookF />
            </SocialIcon>
            <SocialIcon href="https://instagram.com" label="Instagram">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="https://twitter.com" label="Twitter">
              <FaTwitter />
            </SocialIcon>
            <SocialIcon href="https://tiktok.com" label="TikTok">
              <FaTiktok />
            </SocialIcon>
            <SocialIcon href="mailto:kiyacafe@gmail.com" label="Email">
              <HiOutlineMail />
            </SocialIcon>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4
            style={{
              marginBottom: '16px',
              fontSize: '13px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'white',
            }}
          >
            Quick Links
          </h4>
          <FooterLink href="/#home">Home</FooterLink>
          <FooterLink to="/menu">Menu</FooterLink>
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/book-table">Book a Table</FooterLink>
        </div>

        {/* Hours */}
        <div>
          <h4
            style={{
              marginBottom: '16px',
              fontSize: '13px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'white',
            }}
          >
            Opening Hours
          </h4>
          {[
            { day: 'Monday – Friday', hours: '8:00 AM – 10:00 PM' },
            { day: 'Saturday', hours: '9:00 AM – 11:00 PM' },
            { day: 'Sunday', hours: '10:00 AM – 9:00 PM' },
          ].map(({ day, hours }) => (
            <div key={day} style={{ marginBottom: '10px' }}>
              <p style={{ color: '#ccc', fontSize: '13px', margin: '0 0 2px' }}>{day}</p>
              <p style={{ color: colors.orange, fontSize: '12px', margin: 0, fontWeight: '600' }}>
                {hours}
              </p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4
            style={{
              marginBottom: '16px',
              fontSize: '13px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'white',
            }}
          >
            Contact
          </h4>
          {[
            { icon: '📍', text: 'Dessie, Ethiopia' },
            { icon: '📞', text: '+251 900 000 000' },
            { icon: '✉️', text: 'kiyacafe@gmail.com' },
          ].map(({ icon, text }) => (
            <p
              key={text}
              style={{
                color: '#999',
                fontSize: '13px',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>{icon}</span> {text}
            </p>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          textAlign: 'center',
          borderTop: '1px solid #2a2a2a',
          marginTop: '40px',
          paddingTop: '22px',
          color: '#555',
          fontSize: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
          maxWidth: '1100px',
          margin: '40px auto 0',
        }}
      >
        <span>© {new Date().getFullYear()} Kiya Cafe. All rights reserved.</span>
        <span>Made with ❤️ in Dessie, Ethiopia</span>
      </div>
    </footer>
  );
}

export default Footer;
