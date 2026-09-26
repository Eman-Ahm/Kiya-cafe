import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { colors } from '../theme';

const specials = [
  { day: 'Monday', deal: 'Buy 1 Burger, Get 1 Free', emoji: '🍔' },
  { day: 'Tuesday', deal: '20% off all Pizzas', emoji: '🍕' },
  { day: 'Wednesday', deal: 'Free dessert with every meal', emoji: '🍩' },
  { day: 'Thursday', deal: 'Shawarma + Drink combo — 350 Birr', emoji: '🌯' },
  { day: 'Friday', deal: 'Family meal deal — 4 mains + drinks', emoji: '👨‍👩‍👧‍👦' },
  { day: 'Saturday', deal: 'Live music + 10% off total bill', emoji: '🎵' },
  { day: 'Sunday', deal: 'All-day breakfast special', emoji: '🥞' },
];

const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
const todaySpecial = specials.find((s) => s.day === today) || specials[0];

// Ticker items
const tickerItems = specials.map((s) => `${s.emoji}  ${s.day}: ${s.deal}`);

function SpecialsBanner() {
  const [visible, setVisible] = useState(true);
  const [offset, setOffset] = useState(0);

  // Smooth ticker scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => {
        const next = prev - 1;
        // Reset when first item has scrolled off (~240px per item approximation)
        return next < -(tickerItems.join('   •   ').length * 8) ? 0 : next;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  const fullText = tickerItems.join('   •   ') + '   •   ' + tickerItems.join('   •   ');

  return (
    <div style={{ position: 'relative' }}>
      {/* ── Today's Special highlight bar ── */}
      <div
        style={{
          backgroundColor: colors.orange,
          color: colors.navDark,
          padding: '14px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          textAlign: 'center',
        }}
      >
        <span style={{ fontSize: '18px' }}>{todaySpecial.emoji}</span>
        <span style={{ fontWeight: '700', fontSize: '14px' }}>
          Today's Special ({todaySpecial.day}):
        </span>
        <span style={{ fontSize: '14px' }}>{todaySpecial.deal}</span>
        <Link
          to="/book-table"
          style={{
            backgroundColor: colors.navDark,
            color: 'white',
            padding: '6px 16px',
            borderRadius: '16px',
            fontSize: '12px',
            fontWeight: '700',
            textDecoration: 'none',
            marginLeft: '8px',
          }}
        >
          Book Now
        </Link>

        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          aria-label="Close banner"
          style={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            color: colors.navDark,
            opacity: 0.7,
            fontFamily: 'inherit',
          }}
        >
          ✕
        </button>
      </div>

      {/* ── Weekly specials ticker ── */}
      <div
        style={{
          backgroundColor: '#2a2a2a',
          overflow: 'hidden',
          padding: '8px 0',
          whiteSpace: 'nowrap',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            transform: `translateX(${offset}px)`,
            color: '#ccc',
            fontSize: '12px',
            letterSpacing: '0.3px',
          }}
        >
          {fullText}
        </span>
      </div>
    </div>
  );
}

export default SpecialsBanner;
