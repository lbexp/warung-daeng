INSERT INTO categories (name) VALUES
('Electronics'),
('Furniture'),
('Clothing'),
('Books'),
('Toys');

INSERT INTO products (category_id, sku, name, description, weight, width, length, height, image, price) VALUES
(1, 'ELECT-001', 'Smartphone', 'Latest model with advanced features', 200, 75, 150, 8, 1, 699),
(1, 'ELECT-002', 'Laptop', 'High performance laptop with 16GB RAM', 2500, 300, 220, 20, 2, 1299),
(2, 'FURN-001', 'Office Chair', 'Ergonomic office chair with adjustable height', 15000, 60, 60, 120, 1, 199),
(2, 'FURN-002', 'Dining Table', 'Wooden dining table for 6 people', 30000, 150, 90, 75, 3, 399),
(3, 'CLOTH-001', 'T-Shirt', 'Comfortable cotton T-shirt', 200, 50, 70, 5, 1, 19),
(3, 'CLOTH-002', 'Jeans', 'Denim jeans with a slim fit', 500, 40, 90, 10, 1, 49),
(4, 'BOOK-001', 'Novel', 'Bestselling fiction novel', 400, 15, 20, 2, 1, 12),
(4, 'BOOK-002', 'Cookbook', 'Delicious recipes for home cooks', 800, 20, 25, 3, 1, 25),
(5, 'TOYS-001', 'Action Figure', 'Poseable action figure with accessories', 300, 10, 5, 15, 1, 29),
(5, 'TOYS-002', 'Building Blocks', 'Set of colorful building blocks', 1000, 30, 30, 10, 1, 49);