import Order_Product from '../tables_Models/Order_product_type';
import db from '../database';


class Order_ProductModel{
     //create
    async createOrder_Product(op:Order_Product): Promise<Order_Product>{
        try{
            //open connection of db
            const connection = await db.connect();
            //write query
            const sql =  'INSERT INTO Order_Product (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
            //run query
            const result = await connection.query(sql,[
                op.quantity, op.order_id, op.product_id
            ]);
            //release connection
            connection.release();
            return result.rows[0];
        }
        catch(error){
            throw new Error(
                `unable to create this order_product ${(error as Error).message}`
            );
        }
    } 
    
    //get all Order_Product
    async getManyOrder_Product(): Promise<Order_Product[]>{
        try{
            //open connection of db
            const connection = await db.connect();
            //write query
            const sql = 'SELECT quantity, order_id, product_id from Order_Product';
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
    //get specific Order_Product
    async getOrder_Product(id:string): Promise<Order_Product>{
        try{
            //open connection of db
            const connection = await db.connect();
            //write query
            const sql = 'SELECT * FROM Order_Product WHERE id = $1';
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
    //update Order_Product
    async updateOrder_Product(op:Order_Product): Promise<Order_Product>{
        try{
            //open connection of db
            const connection = await db.connect();
            //write query
            const sql = `UPDATE Order_Product
                    SET quantity=$1, , order_id=$2, product_id =$3
                    WHERE id=$4
                    RETURNING quantity, order_id, product_id`;
            //run query
            const result = await connection.query(sql,[
                op.quantity, op.order_id, op.product_id
            ]);
            //release connection
            connection.release();
            return result.rows[0];

        }
        catch(error){
            throw new Error(`unable to update data ${(error as Error).message}`);
        }
    }
    //delete Order_Product
    async deleteOrder_Product(id:string): Promise<Order_Product>{
        try{
            //open connection of db
            const connection = await db.connect();
            //write query
            const sql = `DELETE FROM  Order_Product
                    WHERE id=$1
                    RETURNING quantity, order_id, product_id`;
            //run query
            const result = await connection.query(sql,[id]);
            //release connection
            connection.release();
            return result.rows[0];

        }
        catch(error){
            throw new Error(`unable to delete Order_Product ${(error as Error).message}`);
        }
    }
    
}

export default Order_ProductModel;