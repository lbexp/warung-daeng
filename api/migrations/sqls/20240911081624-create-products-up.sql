CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY NOT NULL,
  category_id INTEGER NOT NULL,
  sku VARCHAR(100) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  weight INTEGER NOT NULL,
  width INTEGER NOT NULL,
  length INTEGER NOT NULL,
  height INTEGER NOT NULL,
  image VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP
)