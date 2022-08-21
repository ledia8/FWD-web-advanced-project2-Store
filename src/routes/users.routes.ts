import { Router} from 'express';
import * as controllers from '../handler/users.controller';
import authenticationMiddleware from '../authentication.middleware';

const routes = Router();

//users
routes.route('/user').get(authenticationMiddleware, controllers.getManyUsers).post (controllers.create);

routes
.route('/:id')
.get(controllers.getOneUser)
.patch(controllers.updateOneUser)
.delete(controllers.deleteOneUser);

//authentication
routes.route('/authenticate').post(controllers.authenticate);

export default routes;