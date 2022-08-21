import { Router} from 'express';
import * as controllers from '../handler/product.controller';
import authenticationMiddleware from '../authentication.middleware';

const routes = Router();

//product
routes.route('/product').get(authenticationMiddleware, controllers.getManyProducts).post (controllers.createProduct);
routes
.route('/:id')
.get(controllers.getOneProduct)
.patch(controllers.updateOneProduct)
.delete(controllers.deleteProduct);



export default routes;