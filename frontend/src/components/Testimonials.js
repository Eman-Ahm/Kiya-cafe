import { useState } from 'react';
import { colors } from '../theme';

const reviews = [
  {
    name: 'Sara M.',
    role: 'Regular Customer',
    text: "The best burgers in town. Fresh, hot, and full of flavor every time! I've been coming here for 3 years and it never disappoints.",
    rating: 5,
    emoji: '👩',
  },
  {
    name: 'Daniel T.',
    role: 'Food Blogger',
    text: "Kiya Cafe has become our weekend spot. The pizza is amazing and the ambiance is just perfect for a family outing.",
    rating: 5,
    emoji: '👨',
  },
  {
    name: 'Helen A.',
    role: 'Local Guide',
    text: "Great service and even better food. Highly recommend the shawarma — the spice blend is absolutely unique.",
    rating: 5,
    emoji: '👩‍💼',
  },
  {
    name: 'Yonas B.',
    role: 'First-time visitor',
    text: "I booked a table online and everything was ready when we arrived. Staff were incredibly welcoming. Will be back soon!",
    rating: 5,
    emoji: '🧑',
  },
  {
    name: 'Marta K.',
    role: 'Event Organiser',
    text: "Booked for a birthday dinner and the team went above and beyond. The food was exceptional and the atmosphere was lovely.",
    rating: 5,
    emoji: '👩‍🦱',
  },
  {
    name: 'Abel F.',
    role: 'University Student',
    text: "Best value for money in Dessie. The french fries and shawarma combo is unbeatable. Comes here at least twice a week.",
    rating: 4,
    emoji: '🧑‍🎓',
  },
];

function StarRating({ rating }) {
  return (
    <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={star <= rating ? colors.orange : '#333'}
          style={{ display: 'block' }}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? '#2a2a2a' : '#222',
        padding: '26px',
        borderRadius: '18px',
        border: `1px solid ${hovered ? colors.orange + '55' : '#2a2a2a'}`,
        transition: 'all 0.25s ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 12px 30px rgba(0,0,0,0.3)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <StarRating rating={review.rating} />
        <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px', fontStyle: 'italic' }}>
          "{review.text}"
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: '#333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            border: `2px solid ${hovered ? colors.orange : '#444'}`,
            transition: 'border-color 0.25s ease',
            flexShrink: 0,
          }}
        >
          {review.emoji}
        </div>
        <div>
          <p style={{ fontWeight: '700', fontSize: '14px', margin: '0 0 2px', color: 'white' }}>
            {review.name}
          </p>
          <p style={{ color: '#666', fontSize: '12px', margin: 0 }}>{review.role}</p>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <section style={{ backgroundColor: colors.navDark, padding: '90px 40px' }}>
      {/* Heading */}
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
          What People Say
        </span>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: '34px',
            margin: '10px 0 14px',
            color: 'white',
          }}
        >
          Customer Reviews
        </h2>
        {/* Overall score */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '3px' }}>
            {[1,2,3,4,5].map((s) => (
              <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill={colors.orange}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span style={{ color: colors.orange, fontWeight: '800', fontSize: '20px' }}>4.9</span>
          <span style={{ color: '#666', fontSize: '13px' }}>from 200+ reviews</span>
        </div>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '22px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {reviews.map((r) => (
          <ReviewCard key={r.name} review={r} />
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
