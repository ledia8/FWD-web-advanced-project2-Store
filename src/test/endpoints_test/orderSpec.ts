import supertest from 'supertest';
import db from '../../database';
import OrderModel from '../../models/Orders.model';
import Order from '../../tables_Models/Orders_type';
import app from '../../server';

const orderModel = new OrderModel();
const request = supertest(app);

describe ('order Endpoints', ()=>{
    const order={
        productQuantity: 1,
        status_of_order:'complete',
    } as Order;

    beforeAll(async()=>{
        const createOrder =await orderModel.createOrder(order);
        order.id = createOrder.id;
    });
    beforeAll(async()=>{
        const connection = await db.connect();
        const sql ='DELETE FROM Orders;';
        await connection.query(sql);
        connection.release();
    });



describe ('Test CRUD methods', ()=>{
    it('should create new order', async () =>{
        const res = await request
        .post('/order/')
        .set('content-type', 'application/json')
        .send({
            productQuantity: 1,
            status_of_order:'complete',
            } as Order);

            expect (res.status).toBe(200);         
    });
    
});
});

