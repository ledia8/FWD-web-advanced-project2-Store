/* Replace with your SQL commands */
CREATE TABLE Products(id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
                                                                 name VARCHAR(100) NOT NULL,
                                                                                   price integer NOT NULL,
                                                                                                 category VARCHAR(100));