/* create user table */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE Users (id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
                                                               email VARCHAR(50) UNIQUE,
                                                                                 user_name VARCHAR(50) Not NULL,
                                                                                                       first_name VARCHAR(50) Not NULL,
                                                                                                                              last_name VARCHAR(50) Not NULL,
                                                                                                                                                    password VARCHAR(225) Not NULL);

