import { Router } from 'express';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.create);

export default usersRouter;