import { useState } from 'react';
import { colors } from '../theme';

import burgerBeef    from '../assets/beef-burger.jpg';
import burgerChicken from '../assets/chicken-burger.jpg';
import pizzaBeef     from '../assets/beaf-pizza.jpg';
import pizzaChicken  from '../assets/chicken-pizza.jpg';
import pasta         from '../assets/pasta-dish.jpg';
import fries         from '../assets/french-fries.jpg';
import shawarma      from '../assets/shawarma-wrap.jpg';
import pancakes      from '../assets/pancakes-stack.jpg';
import donut         from '../assets/donut.jpg';
import sandwich      from '../assets/club-sandwich.jpg';

// Fixed prices — no random on every render
const menuItems = [
  { name: 'Beef Burger',    category: 'Burger',    img: burgerBeef,    desc: 'Juicy beef patty with fresh veggies and special sauce',   price: 380 },
  { name: 'Chicken Burger', category: 'Burger',    img: burgerChicken, desc: 'Grilled chicken fillet with crispy lettuce and mayo',      price: 350 },
  { name: 'Beef Pizza',     category: 'Pizza',     img: pizzaBeef,     desc: 'Wood-fired pizza topped with seasoned beef and cheese',    price: 520 },
  { name: 'Chicken Pizza',  category: 'Pizza',     img: pizzaChicken,  desc: 'Tender chicken with mozzarella on a crispy thin crust',    price: 490 },
  { name: 'Pasta Dish',     category: 'Pasta',     img: pasta,         desc: 'Creamy pasta with rich tomato or Alfredo sauce',           price: 420 },
  { name: 'French Fries',   category: 'Sides',     img: fries,         desc: 'Golden crispy fries seasoned with our secret spice blend', price: 180 },
  { name: 'Shawarma',       category: 'Shawarma',  img: shawarma,      desc: 'Spiced meat with garlic sauce wrapped in warm flatbread',  price: 310 },
  { name: 'Pancakes',       category: 'Breakfast', img: pancakes,      desc: 'Fluffy stack of pancakes served with maple syrup',         price: 280 },
  { name: 'Donut',          category: 'Dessert',   img: donut,         desc: 'Soft glazed donuts dusted with powdered sugar',            price: 120 },
  { name: 'Club Sandwich',  category: 'Sandwich',  img: sandwich,      desc: 'Triple-decker with turkey, bacon, lettuce and tomato',     price: 340 },
];

const categories = ['All', 'Burger', 'Pizza', 'Pasta', 'Shawarma', 'Sides', 'Breakfast', 'Dessert', 'Sandwich'];

function CategoryPill({ cat, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '8px 20px',
        borderRadius: '22px',
        border: active ? 'none' : `1.5px solid ${hovered ? colors.orange : '#ddd'}`,
        cursor: 'pointer',
        backgroundColor: active ? colors.navDark : hovered ? 'rgba(245,166,35,0.08)' : '#f5f5f5',
        color: active ? 'white' : hovered ? colors.orange : '#555',
        fontSize: '13px',
        fontWeight: active ? '600' : '400',
        transition: 'all 0.2s ease',
        transform: hovered && !active ? 'translateY(-1px)' : 'none',
      }}
    >
      {cat}
    </button>
  );
}

function MenuCard({ item }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: '#f3f3f3',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: hovered ? '0 10px 28px rgba(0,0,0,0.18)' : '0 2px 10px rgba(0,0,0,0.08)',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
      }}
    >
      {/* Image with zoom on hover */}
      <div style={{ overflow: 'hidden', height: '160px' }}>
        <img
          src={item.img}
          alt={item.name}
          style={{
            width: '100%',
            height: '160px',
            objectFit: 'cover',
            transition: 'transform 0.35s ease',
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
            display: 'block',
          }}
        />
      </div>

      {/* Card Body */}
      <div
        style={{
          backgroundColor: colors.navDark,
          color: 'white',
          padding: '16px 18px 20px',
        }}
      >
        <h4 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: '600' }}>
          {item.name}
        </h4>
        <p
          style={{
            color: colors.textMuted,
            fontSize: '12px',
            margin: '0 0 14px',
            lineHeight: '1.55',
          }}
        >
          {item.desc}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: colors.orange, fontWeight: '700', fontSize: '15px' }}>
            {item.price} Birr
          </span>
          <span
            style={{
              fontSize: '11px',
              color: '#666',
              backgroundColor: '#2a2a2a',
              padding: '4px 10px',
              borderRadius: '12px',
              letterSpacing: '0.3px',
            }}
          >
            {item.category}
          </span>
        </div>
      </div>
    </div>
  );
}

function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" style={{ backgroundColor: colors.bgLight, padding: '80px 40px' }}>
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <span
          style={{
            color: colors.orange,
            letterSpacing: '3px',
            fontSize: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
          }}
        >
          What We Serve
        </span>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: '34px',
            margin: '8px 0 0',
            color: colors.navDark,
          }}
        >
          Our Menu
        </h2>
      </div>

      {/* Category Filter */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          margin: '28px 0 36px',
          flexWrap: 'wrap',
        }}
      >
        {categories.map((cat) => (
          <CategoryPill
            key={cat}
            cat={cat}
            active={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
          />
        ))}
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
          gap: '22px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {filtered.map((item) => (
          <MenuCard key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}

export default MenuSection;
