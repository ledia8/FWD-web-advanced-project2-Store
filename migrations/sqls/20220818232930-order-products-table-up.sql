/* Replace with your SQL commands */
CREATE TABLE order_products (id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
                                                                        quantity integer, order_id bigint REFERENCES Orders(id),
                                                                                                                     product_id bigint REFERENCES Product(id));