import Order_ProductModel from '../../models/order_product.model';
import db from '../../database'
import Order_Product from '../../tables_Models/Order_product_type';


const order_product_Model = new Order_ProductModel();


describe('Order Product Model', ()=> {
    describe('Test methods exists', () =>{
        expect(order_product_Model.getManyOrder_Product).toBeDefined();
    });
    it('should have a get one Order_Product method', ()=> {
        expect(order_product_Model.getManyOrder_Product).toBeDefined();
    });
    it('should have a create Order_Product method', ()=> {
        expect(order_product_Model.createOrder_Product).toBeDefined();
    });
    it('should have an update Order_Product method', ()=> {
        expect(order_product_Model.updateOrder_Product).toBeDefined();
    });
    it('should have a delete Order_Product method', ()=> {
        expect(order_product_Model.deleteOrder_Product).toBeDefined();
    });


describe('Test Order_Product Model Logic', ()=>{
    const order_product=({
        quantity:1,
        // order_id, product_id,
    })as Order_Product;

    async()=>{
        const connection = await db.connect();
        const sql ='DELETE FROM Products;';
        await connection.query(sql);
        connection.release();
    }
    async()=>{
        const createOrder_Product =await order_product_Model.createOrder_Product(order_product);
        order_product.id = createOrder_Product.id;
        order_product.order_id = createOrder_Product.order_id;
        order_product.product_id = createOrder_Product.product_id;
    }
    

    it('Create method should return a new Order_Product', async ()=>{
        const create_order_product=await order_product_Model.createOrder_Product({
            ...order_product,
            quantity:1,
        })as Order_Product;

        expect(create_order_product).toEqual({
            quantity:1,
        }as Order_Product);
    });
    
    it('Get many method should return All available Order_Products in database', async () =>{
        const order_products = await order_product_Model.getManyOrder_Product();
        expect(order_products.length).toBe(2);
    });
    
    
    it('method update one Order_Product by id', async() =>{
        const returnOneorder_product = await order_product_Model.updateOrder_Product({
            ...order_product,
            quantity:11,
        });
        expect(returnOneorder_product.quantity).toBe(11);
    });
    
    it('Delete one Order_Product', async () => {
        const deleteOrder_Product = await order_product_Model.deleteOrder_Product(order_product.id as string);
        expect(deleteOrder_Product.id).toBe(order_product.id); 
    });
    

});

});