import UserModel from '../models/users.model';
import db from '../database';
import User from '../tables_Models/users_type';

const userModel = new UserModel();

describe('Authentication Model', () =>{
    describe('Test methods exists', () =>{
        it('should have an authenticate user model', () =>{
            expect(userModel.authenticate).toBeDefined();
        });
    });
    describe('test Authenticate Logic', () =>{
        const user={
            email:'test@test.com',
            user_name:'testUser',
            first_name:'test',
            last_name:'user',
            password:'test123',
        } as User;

        beforeAll(async()=>{
            const createUser =await userModel.createUser(user);
            user.id = createUser.id;
        });
        beforeAll(async()=>{
            const connection = await db.connect();
            const sql ='DELETE FROM Users;';
            await connection.query(sql);
            connection.release();
        });
        it('Authenticate method should return the authenticated user', async ()=>{
            const authenticatedUser =await userModel.authenticate(
                user.email,
                user.password as string
            );
            expect(authenticatedUser?.email).toBe(user.email);
            expect(authenticatedUser?.user_name).toBe(user.user_name);
            expect(authenticatedUser?.first_name).toBe(user.first_name);
            expect(authenticatedUser?.last_name).toBe(user.last_name);
        });
        it('Authenticate method should return null for wrong credentials', async ()=>{
            const authenticatedUser = await userModel.authenticate(
                'lm@google.com',
                'fake-password'
            );
            expect(authenticatedUser).toBe(null);
        })
    })
})

