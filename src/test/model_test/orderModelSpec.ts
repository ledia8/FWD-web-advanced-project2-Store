import OrderModel from '../../models/Orders.model';
import db from '../../database'
import Order from '../../tables_Models/Orders_type';


const orderModel = new OrderModel();

describe('order Model', ()=> {
    describe('Test methods exists', () =>{
        expect(orderModel.getManyOrders).toBeDefined();
    });
    it('should have a get one order method', ()=> {
        expect(orderModel.getOneOrder).toBeDefined();
    });
    it('should have a create order method', ()=> {
        expect(orderModel.createOrder).toBeDefined();
    });
    it('should have an update order method', ()=> {
        expect(orderModel.updateOneOrder).toBeDefined();
    });
    it('should have a delete order method', ()=> {
        expect(orderModel.deleteOneOrder).toBeDefined();
    });
    


describe('Test order Model Logic', ()=>{
    const order=({
        // productId:'', 
        // userId:'',
        productQuantity: 1,
        status_of_order:'complete',
    }) as Order;
    async()=>{
        const connection = await db.connect();
        const sql ='DELETE FROM Orders;';
        await connection.query(sql);
        connection.release();
    };
    async()=>{
        const createOrder =await orderModel.createOrder(order);
        order.id = createOrder.id;
        order.productId = createOrder.productId ;
        order.userId = createOrder.userId;
    };

    
    
    it('Get many method should return All available orders in database', async () =>{
        const orders = await orderModel.getManyOrders();
        expect(orders.length).toBe(1);
    });
    
    it('Get One method should return test order when called with id', async() =>{
        const returnOneOrder = await orderModel.getOneOrder(order.id as string);
        expect(returnOneOrder.id).toBe(order.id);
        expect(returnOneOrder.productId).toBe(order.productId);
        expect(returnOneOrder.userId).toBe(order.userId);
        expect(returnOneOrder.productQuantity).toBe(order.productQuantity);
        expect(returnOneOrder.status_of_order).toBe(order.status_of_order);
    });
    
    it('method update one order by id', async() =>{
        const returnOneOrder = await orderModel.updateOneOrder({
            ...order,
            productQuantity: 1,
            status_of_order:'active',
        });
        expect(returnOneOrder.id).toBe(order.id);
        expect(returnOneOrder.productId).toBe(order.productId);
        expect(returnOneOrder.userId).toBe(order.userId);
        expect(returnOneOrder.productQuantity).toBe(order.productQuantity);
        expect(returnOneOrder.status_of_order).toBe('active');
    });
    
    it('Delete one order', async () => {
        const deleteOneOrder = await orderModel.deleteOneOrder(order.id as string);
        expect(deleteOneOrder.id).toBe(order.id); 
    });
    

});

});