import ProductModel from '../models/products.model';
import db from '../database'
import Products from '../tables_Models/Products_type';


const productModel = new ProductModel();


describe('product Model', ()=> {
    describe('Test methods exists', () =>{
        expect(productModel.getManyProducts).toBeDefined();
    });
    it('should have a get one Product method', ()=> {
        expect(productModel.getOneProduct).toBeDefined();
    });
    it('should have a create product method', ()=> {
        expect(productModel.createProduct).toBeDefined();
    });
    it('should have an update product method', ()=> {
        expect(productModel.updateOneProduct).toBeDefined();
    });
    it('should have a delete product method', ()=> {
        expect(productModel.deleteOneProduct).toBeDefined();
    });
    

describe('Test product Model Logic', ()=>{
    const product=({
        name:'p1',
        price: 1,
        category:'test',
    })as Products;

    async()=>{
        const connection = await db.connect();
        const sql ='DELETE FROM Products;';
        await connection.query(sql);
        connection.release();
    }
    async()=>{
        const createProduct =await productModel.createProduct(product);
        product.id = createProduct.id;
    }
    

    it('Create method should return a new product', async ()=>{
        const create_product=await productModel.createProduct({
            name:'p2',
            price: 1,
            category:'test',
        })as Products;
        expect(create_product).toEqual({
            name:'p2',
            price: 1,
            category:'test',
        }as Products);
    });
    
    it('Get many method should return All available products in database', async () =>{
        const products = await productModel.getManyProducts();
        expect(products.length).toBe(2);
    });
    
    it('Get One method should return test product when called with id', async() =>{
        const returnOneProduct = await productModel.getOneProduct(product.id as string);
        expect(returnOneProduct.id).toBe(product.id);
        expect(returnOneProduct.name).toBe(product.name);
        expect(returnOneProduct.price).toBe(product.price);
        expect(returnOneProduct.category).toBe(product.category);
    });
    
    it('method update one product by id', async() =>{
        const returnOneProduct = await productModel.updateOneProduct({
            name:'update',
            price: 1,
            category:'test',
        });
        expect(returnOneProduct.id).toBe(product.id);
        expect(returnOneProduct.name).toBe('update');
        expect(returnOneProduct.price).toBe(1);
        expect(returnOneProduct.category).toBe('test');
    });
    
    it('Delete one product', async () => {
        const deleteProduct = await productModel.deleteOneProduct(product.id as string);
        expect(deleteProduct.id).toBe(product.id); 
    });
    

});

});