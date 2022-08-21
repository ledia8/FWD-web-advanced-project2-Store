/* Replace with your SQL commands */
CREATE TABLE Orders (id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
                                                                user_id int REFERENCES Users(id),
                                                                                       status_of_order VARCHAR(20));