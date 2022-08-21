import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/users.model';
import config from '../config';
import jwt from 'jsonwebtoken'
//ff
const userModel = new UserModel();

export const create = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const user = await userModel.createUser(req.body);
        res.json({data:user });
    }
    catch(error){
        next(error);
    }
};

export const getManyUsers = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const users = await userModel.getManyUsers();
        res.json({data : users});
    } catch(error){
        next(error);
    }
}
export const getOneUser = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const user = await userModel.getOneUser(req.params.id as string);
        res.json({
            data : user});
    } catch(error){
        next(error);
    }
}

export const updateOneUser = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const user = await userModel.updateOneUser(req.body);
        res.json({
            data : user});
    } catch(error){
        next(error);
    }
}

export const deleteOneUser = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const user = await userModel.getOneUser(req.params.id as unknown as string);
        res.json({
            data : user});
    } catch(error){
        next(error);
    }
}

// authenticate
export const authenticate = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const {email,password} = req.body;
        const user  = await userModel.authenticate(email, password);
        const token = jwt.sign ({user}, config.tokenSecret as unknown as string);
        if(!user){
            return res.status(401).json({
                message:'error',
            });
        }
        return res.json({
        data:{...user, token},
        message:'user authenticated successfully',
    })
    } catch(error){
        return next(error);
    }
}

