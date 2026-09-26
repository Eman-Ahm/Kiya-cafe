-- ============================================================
--  Kiya Cafe — MySQL Database Setup
--  Run this once in phpMyAdmin or MySQL shell to set up all tables
-- ============================================================

-- 1. Create the database
CREATE DATABASE IF NOT EXISTS kiyacafe
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE kiyacafe;

-- ============================================================
-- 2. Users table (auth)
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id         INT          NOT NULL AUTO_INCREMENT,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- ============================================================
-- 3. Bookings table (table reservations)
-- ============================================================
CREATE TABLE IF NOT EXISTS bookings (
  id              INT          NOT NULL AUTO_INCREMENT,
  name            VARCHAR(100) NOT NULL,
  phone           VARCHAR(30)  NOT NULL,
  email           VARCHAR(150) NOT NULL,
  table_number    INT          NOT NULL,
  guests          INT          NOT NULL,
  food_preference VARCHAR(100) NOT NULL DEFAULT 'No preference',
  date            DATE         NOT NULL,
  time            VARCHAR(20)  NOT NULL,
  notes           TEXT,
  status          ENUM('Pending','Confirmed','Cancelled') NOT NULL DEFAULT 'Pending',
  created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- ============================================================
-- 4. Recipes table (admin-created recipes)
-- ============================================================
CREATE TABLE IF NOT EXISTS recipes (
  id           INT          NOT NULL AUTO_INCREMENT,
  title        VARCHAR(150) NOT NULL,
  image        VARCHAR(500),
  ingredients  TEXT         NOT NULL,
  steps        TEXT         NOT NULL,
  cooking_time INT,
  category     VARCHAR(80),
  user_id      INT          NOT NULL,
  created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================
-- Done! Tables created: users, bookings, recipes
-- ============================================================
SELECT 'Kiya Cafe database setup complete ✅' AS message;
