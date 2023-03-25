CREATE TABLE product_orders(
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE
);