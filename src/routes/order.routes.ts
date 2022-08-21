import { Router} from 'express';
import * as controllers from '../handler/orders.controller';
import authenticationMiddleware from '../authentication.middleware';

const routes = Router();

///order
routes.route('/order').get(authenticationMiddleware, controllers.getManyOrders).post (controllers.createOrder);
routes
.route('/:id')
.get(controllers.getOneOrder)
.patch(controllers.updateOneOrder)
.delete(controllers.deleteOrder);



export default routes;