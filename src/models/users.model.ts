import bcryt from 'bcrypt'
import User from '../tables_Models/users_type';
import db from '../database';
import config from '../config';

const hashpassword = (password:string) =>{
    const salt = parseInt(config.salt as string, 10);
    return bcryt.hashSync(`${password}${config.pepper}`,salt);
}
class UserModel{
    //create
    async createUser(u: User): Promise<User>{
        try{
            //open connection of db
            const connection = await db.connect();
            //write query
            const sql = `INSERT INTO users (email, user_name, first_name,last_name, password)
            values ($1,$2,$3,$4,$5) returning *`;
            //run query
            const result = await connection.query(sql,[
                u.email, u.user_name,u.first_name,u.last_name, hashpassword(u.password),
            ]);
            //release connection
            connection.release();
            //return created user
            return result.rows[0];
        }
        catch(error){
            throw new Error(
                `unable to create this user 
                (${u.user_name}): ${(error as Error).message}`
            );
        }
    } 
    
    //get all users
    async getManyUsers(): Promise<User[]>{
        try{
            //open connection of db
            const connection = await db.connect();
            //write query
            const sql = 'SELECT id, email, user_name, first_name, last_name from users';
            //run query
            const result = await connection.query(sql);
            //release connection
            connection.release();
            //return created user
            return result.rows;

        }
        catch(error){
            throw new Error(`unable to get data ${(error as Error).message}`);
        }
    }
    //get specific user
    async getOneUser(id:string): Promise<User>{
        try{
            //open connection of db
            const connection = await db.connect();
            //write query
            const sql = `SELECT id, email, user_name, first_name, last_name from users
            where id = ($1)`;//id=($1)
            //run query
            const result = await connection.query(sql,[id]);
            //release connection
            connection.release();
            //return created user
            return result.rows[0];

        }
        catch(error){
            throw new Error(`unable to get data ${(error as Error).message}`);
        }
    }
    //update user
    async updateOneUser(u:User): Promise<User>{
        try{
            //open connection of db
            const connection = await db.connect();
            //write query
            const sql = `UPDATE users
                    SET email=$1, user_name=$2, first_name=$3, last_name=$4,password=$5
                    WHERE id=$6
                    RETURNING id, email, user_name, first_name, last_name`;
            //run query
            const result = await connection.query(sql,[
                u.email, u.user_name,u.first_name,u.last_name, hashpassword(u.password),u.id,
            ]);
            //release connection
            connection.release();
            //return created user
            return result.rows[0];

        }
        catch(error){
            throw new Error(`unable to update data ${(error as Error).message}`);
        }
    }
    //delete user
    async deleteOneUser(id:string): Promise<User>{
        try{
            //open connection of db
            const connection = await db.connect();
            //write query
            const sql = `DELETE FROM  users
                    WHERE id=$1
                    RETURNING id, email, user_name, first_name, last_name`;
            //run query
            const result = await connection.query(sql,[id]);
            //release connection
            connection.release();
            //return created user
            return result.rows[0];

        }
        catch(error){
            throw new Error(`unable to delete user ${(error as Error).message}`);
        }
    }
    //authenticate user
    async authenticate(email:string,password:string): Promise<User | null>{
        try{
            const connection = await db.connect();
            const sql = 'SELECT password FROM users WHERE email=$1';
            const result = await connection.query(sql,[email]);
            if(result.rows.length){
                const{password: hashPassword} = result.rows[0];
                const isPasswordValid = bcryt.compareSync(
                    `${password}${config.pepper}`, hashPassword
                );
            if(isPasswordValid){
                const userInfo = await connection.query(
                    'SELECT id,email,user_name,first_name,last_name FROM users WHERE email=($1)',
                    [email]
                );
                return userInfo.rows[0];
            }
            }
            connection.release();
            return null;
        }
        catch(error){
            throw new Error (`Unable to login: ${(error as Error).message}`);
        }
    }

}
export default UserModel;