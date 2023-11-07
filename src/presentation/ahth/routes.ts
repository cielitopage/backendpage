import { Router } from 'express';
import { AuthController } from './controller';




export class Authroutes {


  static get routes(): Router {

    const router = Router();

    const authController = new AuthController();
    
    // Definir las rutas
     router.post('/login', authController.login);
     router.post('/register', authController.register);
     router.get('/validate-email/:token', authController.validateEmail);


    return router;
  }


}

