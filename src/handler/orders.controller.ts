import { Request, Response, NextFunction } from 'express';
import OrderModel from '../models/Orders.model';
// import config from '../config';
// import jwt from 'jsonwebtoken'

const orderModel = new OrderModel();

export const createOrder = async(req: Request, res: Response, next:NextFunction) => {
    try{
        //validation here
        const order = await orderModel.createOrder(req.body);
        res.json({
            status: 'success',
            data:{...order},
            message:'order created successfully',
        })

    }
    catch(error){
        next(error);

    }
};

export const getManyOrders = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const orders = await orderModel.getManyOrders();
        res.json({
            status:'success',
            data : orders,
            message: 'order retrieved successfully',
        });
    } catch(error){
        next(error);
    }
}
export const getOneOrder = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const order = await orderModel.getOneOrder(req.params.id as string);
        res.json({
            status:'success',
            data : order,
            message: 'order retrieved successfully',
        });
    } catch(error){
        next(error);
    }
}

export const updateOneOrder = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const order = await orderModel.updateOneOrder(req.body);
        res.json({
            status:'success',
            data : order,
            message: 'order Updated successfully',
        });
    } catch(error){
        next(error);
    }
}

export const deleteOrder = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const order = await orderModel.getOneOrder(req.params.id as unknown as string);
        res.json({
            status:'success',
            data : order,
            message: 'order deleted successfully',
        });
    } catch(error){
        next(error);
    }
}


