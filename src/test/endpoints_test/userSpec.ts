import supertest from 'supertest';
import db from '../../database';
import UserModel from '../../models/users.model';
import User from '../../tables_Models/users_type';
import app from '../../server';

const userModel = new UserModel();
const request = supertest(app);
let token = '';

describe ('user Endpoints', ()=>{
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

describe('Test Authenticate method', ()=>{
    it('should be able to authenticate to get token', async()=>{
        const res = await request
        .post('/users/authenticate')
        .set('content-type', 'application/json')
        .send({
            email:'test@test.com',
            password:'test123',
        });
        expect(res.status).toBe(200);
        const {id,email, token:userToken} = res.body.data;
        expect(id).toBe(user.id);
        expect(email).toBe('test@test.com');
        token = userToken;
    });

    it('should be failed to authenticate with wrong email', async ()=> {
        const res = await request
        .post('/users/authenticate')
        .set('content-type', 'application/json')
        .send({
            email:'wrong@test.com',
            password:'test123',
        });
        expect(res.status).toBe(401);
    });
});

describe ('Test CRUD methods', ()=>{
    it('should create new user', async () =>{
        const res = await request
        .post('/user/')
        .set('content-type', 'application/json')
        .send({
            email:'test2@test2.com',
            user_name:'testUser2',
            first_name:'test2',
            last_name:'user2',
            password:'test123',
            } as User);
            expect (res.status).toBe(200);
            const {email, user_name, first_name, last_name} = res.body.data;
            expect(email).toBe('test2@test2.com');
            expect(user_name).toBe('testUser2');
            expect(first_name).toBe('test2');
            expect(last_name).toBe('user2');          
    });
    it('should get list of users', async() =>{
        const res = await request
        .get('/user/')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.data.length).toBe(2);
    });
    it('should get user info', async() =>{
        const res = await request
        .get(`/user/${user.id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.data.user_name).toBe('test2@test2.com');
        expect(res.body.data.email).toBe('testUser2');        
    });
    it('should update user info', async() =>{
        const res = await request
        .patch(`/user/${user.id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
            ...user,
            user_name:'lm',
            first_name:'l',
            last_name:'m',
        });
        expect(res.status).toBe(200);
        const {id, email, user_name, first_name,last_name} = res.body.data;
        expect(id).toBe(user.id);
        expect(email).toBe(user.email);
        expect(user_name).toBe('lm');
        expect(first_name).toBe('l'); 
        expect(last_name).toBe('m');        
    });
    it('should delete user', async() =>{
        const res = await request
        .delete(`/user/${user.id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.data.id).toBe(user.id);
        expect(res.body.data.user_name).toBe('lm');      
    });    

});

});

