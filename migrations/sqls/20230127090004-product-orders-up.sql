CREATE TABLE product_orders(
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    product_id INTEGER REFERENCES products(id),
    order_id INTEGER REFERENCES orders(id)
);