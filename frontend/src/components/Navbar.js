import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { colors } from '../theme';
import '../navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Update token state when route changes (after login/logout)
  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setMenuOpen(false);
  }, [location]);

  // Navbar shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
  };

  const userName = (() => {
    try {
      const u = localStorage.getItem('userName');
      return u || null;
    } catch {
      return null;
    }
  })();

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 40px',
        height: '68px',
        backgroundColor: colors.navDark,
        flexWrap: 'wrap',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: scrolled
          ? '0 4px 20px rgba(0,0,0,0.5)'
          : '0 2px 12px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* ── Logo ── */}
      <Link
        to="/"
        onClick={closeMenu}
        style={{
          color: colors.orange,
          fontSize: '24px',
          fontStyle: 'italic',
          fontFamily: "'Playfair Display', serif",
          textDecoration: 'none',
          letterSpacing: '0.5px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '20px' }}>☕</span>
        Kiya Cafe
      </Link>

      {/* ── Hamburger (mobile) ── */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen((p) => !p)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none', transition: 'transform 0.3s ease' }} />
        <span style={{ opacity: menuOpen ? 0 : 1, transition: 'opacity 0.3s ease' }} />
        <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none', transition: 'transform 0.3s ease' }} />
      </button>

      {/* ── Center Links ── */}
      <div
        className={`nav-links-center${menuOpen ? ' open' : ''}`}
        style={{ display: 'flex', gap: '32px', alignItems: 'center' }}
      >
        {[
          { to: '/', label: 'Home', end: true },
          { to: '/menu', label: 'Menu' },
          { to: '/about', label: 'About' },
          { to: '/book-table', label: 'Book Table' },
        ].map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            onClick={closeMenu}
          >
            {label}
          </NavLink>
        ))}
      </div>

      {/* ── Right Side ── */}
      <div
        className={`nav-links-right${menuOpen ? ' open' : ''}`}
        style={{ display: 'flex', gap: '12px', alignItems: 'center' }}
      >
        {token ? (
          <>
            {userName && (
              <span style={{ color: '#aaa', fontSize: '13px' }}>
                Hi, <strong style={{ color: 'white' }}>{userName}</strong>
              </span>
            )}
            <button
              onClick={handleLogout}
              className="btn-signout"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-signin" onClick={closeMenu}>
              Sign In
            </Link>
            <Link to="/signup" className="btn-signup-nav" onClick={closeMenu}>
              Sign Up
            </Link>
          </>
        )}

        {/* Book Table CTA */}
        <Link to="/book-table" className="btn-book" onClick={closeMenu}>
          Book a Table
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
