import { useState } from 'react';
import { Link } from 'react-router-dom';
import { colors } from '../theme';

import burgerBeef   from '../assets/beef-burger.jpg';
import pizzaChicken from '../assets/chicken-pizza.jpg';
import shawarma     from '../assets/shawarma-wrap.jpg';

const picks = [
  {
    name: 'Signature Beef Burger',
    tag: "#1 Best Seller",
    tagColor: '#f5a623',
    img: burgerBeef,
    desc: 'Our most-ordered dish — a towering beef patty with caramelised onions, aged cheddar, and our house sauce on a brioche bun.',
    price: 380,
    badge: '🏆',
  },
  {
    name: 'Chicken Pizza',
    tag: "Chef's Favourite",
    tagColor: '#2ecc71',
    img: pizzaChicken,
    desc: 'Thin-crust pizza with marinated chicken, roasted peppers, mozzarella, and a drizzle of garlic oil. Wood-fired to perfection.',
    price: 490,
    badge: '👨‍🍳',
  },
  {
    name: 'Spiced Shawarma',
    tag: "Customer Favourite",
    tagColor: '#9b59b6',
    img: shawarma,
    desc: 'Slow-roasted spiced meat, pickled vegetables, tahini sauce, all wrapped in a warm flatbread. A Kiya Cafe classic.',
    price: 310,
    badge: '❤️',
  },
];

function RecommendCard({ pick, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
        alignItems: 'center',
        gap: '40px',
        backgroundColor: hovered ? '#f9f6f0' : 'white',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: hovered
          ? '0 16px 40px rgba(0,0,0,0.12)'
          : '0 4px 16px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
        flexWrap: 'wrap',
        border: `1px solid ${hovered ? colors.orange + '44' : '#f0f0f0'}`,
      }}
    >
      {/* Image */}
      <div style={{ flex: '0 0 300px', maxWidth: '300px', overflow: 'hidden', minHeight: '240px' }}>
        <img
          src={pick.img}
          alt={pick.name}
          style={{
            width: '100%',
            height: '240px',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            display: 'block',
          }}
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '32px 32px 32px 8px', minWidth: '240px' }}>
        {/* Tag */}
        <span
          style={{
            backgroundColor: pick.tagColor + '22',
            color: pick.tagColor,
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            padding: '4px 12px',
            borderRadius: '20px',
            display: 'inline-block',
            marginBottom: '12px',
          }}
        >
          {pick.badge} {pick.tag}
        </span>

        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '24px',
            color: colors.navDark,
            margin: '0 0 12px',
          }}
        >
          {pick.name}
        </h3>
        <p style={{ color: '#777', lineHeight: '1.7', fontSize: '14px', marginBottom: '20px' }}>
          {pick.desc}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span
            style={{
              fontSize: '20px',
              fontWeight: '800',
              color: colors.orange,
            }}
          >
            {pick.price} Birr
          </span>
          <Link
            to="/book-table"
            style={{
              backgroundColor: colors.navDark,
              color: 'white',
              padding: '10px 22px',
              borderRadius: '22px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '600',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.orange)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.navDark)}
          >
            Reserve & Try It
          </Link>
        </div>
      </div>
    </div>
  );
}

function Recommendations() {
  return (
    <section
      style={{
        backgroundColor: '#fafaf7',
        padding: '90px 40px',
      }}
    >
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span
          style={{
            color: colors.orange,
            letterSpacing: '3px',
            fontSize: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
          }}
        >
          Don't Miss These
        </span>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: '36px',
            margin: '10px 0 14px',
            color: colors.navDark,
          }}
        >
          Chef's Recommendations
        </h2>
        <p style={{ color: '#888', fontSize: '15px', maxWidth: '480px', margin: '0 auto' }}>
          Hand-picked by our chef — these are the dishes our guests come back for, every single time.
        </p>
      </div>

      {/* Cards */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {picks.map((pick, i) => (
          <RecommendCard key={pick.name} pick={pick} index={i} />
        ))}
      </div>
    </section>
  );
}

export default Recommendations;
