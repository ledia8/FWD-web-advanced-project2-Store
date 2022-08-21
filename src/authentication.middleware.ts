import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Error from './error.interface';
import config from './config';


const validateToken =(req: Request, res: Response, next:NextFunction) => {

    try{
        const header = req.get('Authorization');
        if(header){
            const allHeader = header.split(' ');
            const bearer = allHeader[0];
            const token = allHeader[1];
            if(token && bearer == 'bearer') {
                const decode = jwt.verify(token, config.tokenSecret as unknown as string);
                if(decode){
                    next();
                }
            }
        }else{
            const error:Error = new Error('login Error: Please try again');
            error.status=401;
            next(error);
        }
        
    }catch(error){
        next(error);
    }
};

export default validateToken;