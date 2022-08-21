import Order from '../tables_Models/Orders_type';
import db from '../database';


class OrderModel{
     //create
    async createOrder(o:Order): Promise<Order>{
        try{
            //open connection of db
            const connection = await db.connect();
            //write query
            const sql =  'INSERT INTO orders (productId, userId, productQuantity, status_of_order) VALUES ($1, $2, $3) RETURNING *';
            //run query
            const result = await connection.query(sql,[
                o.productId,o.userId,o.productQuantity,o.status_of_order
            ]);
            //release connection
            connection.release();
            return result.rows[0];
        }
        catch(error){
            throw new Error(
                `unable to create this order ${(error as Error).message}`
            );
        }
    } 
    
    //get all orders
    async getManyOrders(): Promise<Order[]>{
        try{
            //open connection of db
            const connection = await db.connect();
            //write query
            const sql = 'SELECT productId, userId, productQuantity, status_of_order from orders';
            //run query
            const result = await connection.query(sql);
            //release connection
            connection.release();
            return result.rows;

        }
        catch(error){
            throw new Error(`unable to get data ${(error as Error).message}`);
        }
    }
    //get specific order
    async getOneOrder(id:string): Promise<Order>{
        try{
            //open connection of db
            const connection = await db.connect();
            //write query
            const sql = 'SELECT * FROM Orders WHERE id = $1';
            //run query
            const result = await connection.query(sql,[id]);
            //release connection
            connection.release();
            return result.rows[0];

        }
        catch(error){
            throw new Error(`unable to get data ${(error as Error).message}`);
        }
    }
    //update order
    async updateOneOrder(o:Order): Promise<Order>{
        try{
            //open connection of db
            const connection = await db.connect();
            //write query
            const sql = `UPDATE orders
                    SET productId=$1, userId=$2, productQuantity=$3, status_of_order=$4
                    WHERE id=$6
                    RETURNING productId, userId, productQuantity, status_of_order`;
            //run query
            const result = await connection.query(sql,[
                o.productId, o.userId,o.productQuantity,o.status_of_order,
            ]);
            //release connection
            connection.release();
            return result.rows[0];

        }
        catch(error){
            throw new Error(`unable to update data ${(error as Error).message}`);
        }
    }
    //delete order
    async deleteOneOrder(id:string): Promise<Order>{
        try{
            //open connection of db
            const connection = await db.connect();
            //write query
            const sql = `DELETE FROM  Order
                    WHERE id=$1
                    RETURNING productId, userId, productQuantity, status_of_order`;
            //run query
            const result = await connection.query(sql,[id]);
            //release connection
            connection.release();
            return result.rows[0];

        }
        catch(error){
            throw new Error(`unable to delete order ${(error as Error).message}`);
        }
    }
    
}

export default OrderModel;