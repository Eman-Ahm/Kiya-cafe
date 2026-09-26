import { useState } from 'react';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { colors } from '../theme';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      if (res.data.user?.name) {
        localStorage.setItem('userName', res.data.user.name);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: '#f5f5f0',
      }}
    >
      {/* ── Left Panel — branding ── */}
      <div
        style={{
          flex: 1,
          background: `linear-gradient(160deg, #1a1a1a 0%, #2c2c2c 60%, #1a1a1a 100%)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 40px',
          color: 'white',
          minHeight: '100vh',
        }}
        className="auth-left-panel"
      >
        <div style={{ textAlign: 'center', maxWidth: '360px' }}>
          <div style={{ fontSize: '52px', marginBottom: '20px' }}>☕</div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontSize: '38px',
              color: colors.orange,
              marginBottom: '14px',
            }}
          >
            Kiya Cafe
          </h1>
          <p style={{ color: '#999', lineHeight: '1.8', fontSize: '15px' }}>
            Great food, great moments. We're happy to have you back.
          </p>

          {/* Feature badges */}
          <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { icon: '🍽️', text: 'Reserve your table in seconds' },
              { icon: '🌟', text: 'Chef-crafted dishes daily' },
              { icon: '📍', text: 'Located in Dessie, Ethiopia' },
            ].map(({ icon, text }) => (
              <div
                key={text}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: '#252525',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid #333',
                }}
              >
                <span style={{ fontSize: '20px' }}>{icon}</span>
                <span style={{ color: '#ccc', fontSize: '13px' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel — form ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 32px',
          minHeight: '100vh',
        }}
      >
        <div style={{ width: '100%', maxWidth: '420px' }}>
          {/* Header */}
          <div style={{ marginBottom: '36px' }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '30px',
                color: colors.navDark,
                marginBottom: '8px',
              }}
            >
              Welcome back
            </h2>
            <p style={{ color: '#888', fontSize: '14px' }}>
              Sign in to your Kiya Cafe account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                backgroundColor: '#fdecea',
                border: '1px solid #f5c6cb',
                color: '#c0392b',
                padding: '12px 16px',
                borderRadius: '10px',
                fontSize: '13px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <AuthField
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
            <AuthField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <SubmitButton loading={loading}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </SubmitButton>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#888' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: colors.orange, fontWeight: '600', textDecoration: 'none' }}>
              Create one
            </Link>
          </p>

          <p style={{ textAlign: 'center', marginTop: '12px' }}>
            <Link to="/" style={{ color: '#aaa', fontSize: '13px', textDecoration: 'none' }}>
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Shared sub-components ── */
function AuthField({ label, name, type, placeholder, value, onChange, required }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: '18px' }}>
      <label
        style={{
          display: 'block',
          fontSize: '13px',
          fontWeight: '600',
          color: '#444',
          marginBottom: '6px',
        }}
      >
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        style={{
          width: '100%',
          padding: '12px 16px',
          border: `1.5px solid ${focused ? colors.orange : '#ddd'}`,
          borderRadius: '10px',
          fontSize: '14px',
          outline: 'none',
          backgroundColor: focused ? '#fffdf7' : '#fafafa',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
          boxShadow: focused ? '0 0 0 3px rgba(245,166,35,0.15)' : 'none',
          boxSizing: 'border-box',
          color: '#1a1a1a',
        }}
      />
    </div>
  );
}

function SubmitButton({ loading, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="submit"
      disabled={loading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        padding: '13px',
        backgroundColor: loading ? '#ccc' : hovered ? '#e0941a' : colors.orange,
        color: '#1a1a1a',
        border: 'none',
        borderRadius: '25px',
        cursor: loading ? 'not-allowed' : 'pointer',
        fontWeight: '700',
        fontSize: '15px',
        marginTop: '8px',
        transition: 'background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease',
        transform: hovered && !loading ? 'translateY(-2px)' : 'none',
        boxShadow: hovered && !loading ? '0 6px 20px rgba(245,166,35,0.4)' : 'none',
        fontFamily: 'inherit',
      }}
    >
      {children}
    </button>
  );
}

export default Login;
