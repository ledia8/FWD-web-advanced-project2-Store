import { Request, Response, NextFunction } from 'express';
import ProductsModel from '../models/products.model';
// import config from '../config';
// import jwt from 'jsonwebtoken'

const productsModel = new ProductsModel();

export const createProduct = async(req: Request, res: Response, next:NextFunction) => {
    try{
        //validation here
        const product = await productsModel.createProduct(req.body);
        res.json({
            status: 'success',
            data:{...product},
            message:'product created successfully',
        })

    }
    catch(error){
        next(error);

    }
};

export const getManyProducts = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const products = await productsModel.getManyProducts();
        res.json({
            status:'success',
            data : products,
            message: 'products retrieved successfully',
        });
    } catch(error){
        next(error);
    }
}
export const getOneProduct = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const product = await productsModel.getOneProduct(req.params.id as string);
        res.json({
            status:'success',
            data : product,
            message: 'product retrieved successfully',
        });
    } catch(error){
        next(error);
    }
}

export const updateOneProduct = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const product = await productsModel.updateOneProduct(req.body);
        res.json({
            status:'success',
            data : product,
            message: 'product Updated successfully',
        });
    } catch(error){
        next(error);
    }
}

export const deleteProduct = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const product = await productsModel.getOneProduct(req.params.id as unknown as string);
        res.json({
            status:'success',
            data : product,
            message: 'product deleted successfully',
        });
    } catch(error){
        next(error);
    }
}


