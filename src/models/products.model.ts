import Products from '../tables_Models/Products_type';
import db from '../database';


class ProductsModel{
     //create
    async createProduct(p:Products): Promise<Products>{
        try{
            //open connection of db
            const connection = await db.connect();
            //write query
            const sql =  'INSERT INTO Products (name, price, category) VALUES ($1, $2, $3) RETURNING *';
            //run query
            const result = await connection.query(sql,[
                p.name,p.price,p.category
            ]);
            //release connection
            connection.release();
            //return created Product
            return result.rows[0];
        }
        catch(error){
            throw new Error(
                `unable to create this product ${(error as Error).message}`
            );
        }
    } 
    
    //get all Products
    async getManyProducts(): Promise<Products[]>{
        try{
            //open connection of db
            const connection = await db.connect();
            //write query
            const sql = 'SELECT name, price, category from Products';
            //run query
            const result = await connection.query(sql);
            //release connection
            connection.release();
            //return created Product
            return result.rows;

        }
        catch(error){
            throw new Error(`unable to get data ${(error as Error).message}`);
        }
    }
    //get specific Products
    async getOneProduct(id:string): Promise<Products>{
        try{
            //open connection of db
            const connection = await db.connect();
            //write query
            const sql = 'SELECT * FROM Products WHERE id = $1';
            //run query
            const result = await connection.query(sql,[id]);
            //release connection
            connection.release();
            //return created Product
            return result.rows[0];

        }
        catch(error){
            throw new Error(`unable to get data ${(error as Error).message}`);
        }
    }
    //update Products
    async updateOneProduct(p:Products): Promise<Products>{
        try{
            //open connection of db
            const connection = await db.connect();
            //write query
            const sql = `UPDATE Products
                    SET  name=$1, price=$2, category =$3
                    WHERE id=$4
                    RETURNING name, price, category`;
            //run query
            const result = await connection.query(sql,[
                p.name,p.price,p.category
            ]);
            //release connection
            connection.release();
        
            return result.rows[0];

        }
        catch(error){
            throw new Error(`unable to update data ${(error as Error).message}`);
        }
    }
    //delete Products
    async deleteOneProduct(id:string): Promise<Products>{
        try{
            //open connection of db
            const connection = await db.connect();
            //write query
            const sql = `DELETE FROM  Products
                    WHERE id=$1
                    RETURNING name, price, category`;
            //run query
            const result = await connection.query(sql,[id]);
            //release connection
            connection.release();
            //return created Product
            return result.rows[0];

        }
        catch(error){
            throw new Error(`unable to delete Product ${(error as Error).message}`);
        }
    }
    
}

export default ProductsModel;