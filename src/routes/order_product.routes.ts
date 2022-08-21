import { Router} from 'express';
import * as controllers from '../handler/order_product.controller';
import authenticationMiddleware from '../authentication.middleware';

const routes = Router();

///order_product
routes.route('/order_product').get(authenticationMiddleware, controllers.getManyOrder_Product).post (controllers.createOrder_Product);
routes
.route('/:id')
.get(controllers.getOrder_Product)
.patch(controllers.updateOrder_Product)
.delete(controllers.deleteOrder_Product);



export default routes;