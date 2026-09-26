import { useState } from 'react';
import { colors } from '../theme';
import API from '../api/axios';

const foodOptions = [
  'No preference',
  'Burger',
  'Pizza',
  'Pasta',
  'Shawarma',
  'French Fries',
  'Sandwich',
  'Breakfast',
  'Dessert',
];

const timeSlots = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
  '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM',
  '08:00 PM', '09:00 PM',
];

const defaultForm = {
  name: '',
  phone: '',
  email: '',
  tableNumber: '',
  guests: '',
  foodPreference: 'No preference',
  date: '',
  time: '',
  notes: '',
};

function BookTableSection() {
  const [form, setForm] = useState(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await API.post('/bookings', form);
      setSubmitted(true);
      setForm(defaultForm);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputBase = (name) => ({
    width: '100%',
    padding: '11px 14px',
    border: `1.5px solid ${focusedField === name ? colors.orange : '#ddd'}`,
    borderRadius: '10px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#fafafa',
    color: colors.navDark,
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxShadow: focusedField === name ? `0 0 0 3px rgba(245,166,35,0.18)` : 'none',
    boxSizing: 'border-box',
  });

  const labelStyle = {
    fontSize: '12px',
    fontWeight: '600',
    color: '#555',
    marginBottom: '5px',
    display: 'block',
    letterSpacing: '0.3px',
  };

  const fieldWrap = { marginBottom: '14px' };

  const row = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '14px',
  };

  return (
    <section
      id="book"
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
        padding: '80px 40px',
        color: 'white',
      }}
    >
      {/* ── Heading ── */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <span
          style={{
            color: colors.orange,
            letterSpacing: '3px',
            fontSize: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
          }}
        >
          Reservations
        </span>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: '34px',
            margin: '8px 0 12px',
            color: 'white',
          }}
        >
          Book A Table
        </h2>
        <p style={{ color: '#999', fontSize: '14px', maxWidth: '400px', margin: '0 auto' }}>
          Reserve your spot at Kiya Cafe. We'll have everything ready for you.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '50px',
          flexWrap: 'wrap',
          maxWidth: '1100px',
          margin: '0 auto',
          alignItems: 'flex-start',
        }}
      >
        {/* ── Form ── */}
        <div
          style={{
            flex: '1',
            minWidth: '320px',
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '35px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}
        >
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '30px 0' }}>
              <div style={{ fontSize: '52px', marginBottom: '16px' }}>🎉</div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: colors.navDark,
                  marginBottom: '10px',
                }}
              >
                Reservation Confirmed!
              </h3>
              <p style={{ color: '#888', fontSize: '14px', marginBottom: '24px' }}>
                Thanks! Your table is being held. We'll see you soon at Kiya Cafe.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                style={{
                  backgroundColor: colors.orange,
                  color: colors.navDark,
                  border: 'none',
                  padding: '11px 28px',
                  borderRadius: '22px',
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: '14px',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#e0941a')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = colors.orange)}
              >
                Make Another Booking
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <p
                  style={{
                    color: '#e74c3c',
                    fontSize: '13px',
                    backgroundColor: '#fdecea',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                  }}
                >
                  {error}
                </p>
              )}

              {/* Row 1: Name + Phone */}
              <div style={row}>
                <div style={fieldWrap}>
                  <label style={labelStyle}>Full Name *</label>
                  <input
                    name="name"
                    placeholder="e.g. Sara Ahmed"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField('')}
                    style={inputBase('name')}
                    required
                  />
                </div>
                <div style={fieldWrap}>
                  <label style={labelStyle}>Phone Number *</label>
                  <input
                    name="phone"
                    placeholder="+251 900 000 000"
                    value={form.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField('')}
                    style={inputBase('phone')}
                    required
                  />
                </div>
              </div>

              {/* Row 2: Email + Table Number */}
              <div style={row}>
                <div style={fieldWrap}>
                  <label style={labelStyle}>Email Address *</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    style={inputBase('email')}
                    required
                  />
                </div>
                <div style={fieldWrap}>
                  <label style={labelStyle}>Table Number *</label>
                  <input
                    name="tableNumber"
                    type="number"
                    placeholder="e.g. 5"
                    min="1"
                    max="30"
                    value={form.tableNumber}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('tableNumber')}
                    onBlur={() => setFocusedField('')}
                    style={inputBase('tableNumber')}
                    required
                  />
                </div>
              </div>

              {/* Row 3: Date + Time */}
              <div style={row}>
                <div style={fieldWrap}>
                  <label style={labelStyle}>Date *</label>
                  <input
                    name="date"
                    type="date"
                    value={form.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('date')}
                    onBlur={() => setFocusedField('')}
                    style={inputBase('date')}
                    required
                  />
                </div>
                <div style={fieldWrap}>
                  <label style={labelStyle}>Time *</label>
                  <select
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('time')}
                    onBlur={() => setFocusedField('')}
                    style={{ ...inputBase('time'), cursor: 'pointer' }}
                    required
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Guests + Food Preference */}
              <div style={row}>
                <div style={fieldWrap}>
                  <label style={labelStyle}>Number of Guests *</label>
                  <input
                    name="guests"
                    type="number"
                    placeholder="e.g. 4"
                    min="1"
                    max="20"
                    value={form.guests}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('guests')}
                    onBlur={() => setFocusedField('')}
                    style={inputBase('guests')}
                    required
                  />
                </div>
                <div style={fieldWrap}>
                  <label style={labelStyle}>Food Preference</label>
                  <select
                    name="foodPreference"
                    value={form.foodPreference}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('foodPreference')}
                    onBlur={() => setFocusedField('')}
                    style={{ ...inputBase('foodPreference'), cursor: 'pointer' }}
                  >
                    {foodOptions.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div style={fieldWrap}>
                <label style={labelStyle}>Special Requests (optional)</label>
                <textarea
                  name="notes"
                  placeholder="Any allergies, special occasions, seating preferences..."
                  value={form.notes}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('notes')}
                  onBlur={() => setFocusedField('')}
                  rows={3}
                  style={{
                    ...inputBase('notes'),
                    resize: 'vertical',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '13px',
                  backgroundColor: loading ? '#ccc' : colors.orange,
                  color: colors.navDark,
                  border: 'none',
                  borderRadius: '25px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: '700',
                  fontSize: '15px',
                  marginTop: '6px',
                  transition: 'background-color 0.25s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!loading) e.target.style.backgroundColor = '#e0941a';
                }}
                onMouseLeave={(e) => {
                  if (!loading) e.target.style.backgroundColor = colors.orange;
                }}
              >
                {loading ? 'Reserving...' : 'Reserve My Table 🍽️'}
              </button>
            </form>
          )}
        </div>

        {/* ── Info + Map ── */}
        <div
          style={{
            flex: '1',
            minWidth: '300px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {/* Info Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
            }}
          >
            {[
              { icon: '📍', title: 'Location', detail: 'Dessie, Ethiopia' },
              { icon: '📞', title: 'Phone', detail: '+251 900 000 000' },
              { icon: '🕐', title: 'Open Hours', detail: '8 AM – 10 PM Daily' },
              { icon: '✉️', title: 'Email', detail: 'kiyacafe@gmail.com' },
            ].map((info) => (
              <div
                key={info.title}
                style={{
                  backgroundColor: '#252525',
                  borderRadius: '14px',
                  padding: '18px',
                  border: '1px solid #333',
                }}
              >
                <div style={{ fontSize: '22px', marginBottom: '8px' }}>{info.icon}</div>
                <p
                  style={{
                    color: colors.orange,
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    margin: '0 0 4px',
                  }}
                >
                  {info.title}
                </p>
                <p style={{ color: '#ccc', fontSize: '13px', margin: 0 }}>
                  {info.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Map */}
          <iframe
            title="Kiya Cafe Location"
            src="https://www.google.com/maps?q=Dessie,Ethiopia&output=embed"
            width="100%"
            height="280"
            style={{
              border: 0,
              borderRadius: '16px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

export default BookTableSection;
