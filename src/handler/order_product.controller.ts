import { Request, Response, NextFunction } from 'express';
import Order_ProductModel from '../models/order_product.model';
// import config from '../config';
// import jwt from 'jsonwebtoken'

const order_productModel = new Order_ProductModel();

export const createOrder_Product = async(req: Request, res: Response, next:NextFunction) => {
    try{
        //validation here
        const order_product = await order_productModel.createOrder_Product(req.body);
        res.json({
            status: 'success',
            data:{...order_product},
            message:'order_product created successfully',
        })

    }
    catch(error){
        next(error);

    }
};

export const getManyOrder_Product = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const order_product = await order_productModel.getManyOrder_Product();
        res.json({
            status:'success',
            data : order_product,
            message: 'order_product retrieved successfully',
        });
    } catch(error){
        next(error);
    }
}
export const getOrder_Product = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const order_product = await order_productModel.getOrder_Product(req.params.id as string);
        res.json({
            status:'success',
            data : order_product,
            message: 'order_product retrieved successfully',
        });
    } catch(error){
        next(error);
    }
}

export const updateOrder_Product = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const order_product = await order_productModel.updateOrder_Product(req.body);
        res.json({
            data : order_product,
            message: 'order_product Updated successfully',
        });
    } catch(error){
        next(error);
    }
}

export const deleteOrder_Product = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const order_product = await order_productModel.getOrder_Product(req.params.id as unknown as string);
        res.json({
            data : order_product,
            message: 'order_product deleted successfully',
        });
    } catch(error){
        next(error);
    }
}


