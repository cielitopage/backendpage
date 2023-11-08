import { Router } from 'express';
import { AuthController } from './controller';
import { AuthServices } from '../services/auth.services';




export class Authroutes {


  static get routes(): Router {

    const router = Router();

    const authServices = new AuthServices(); 
    const authController = new AuthController(authServices); 
    
    // Definir las rutas
     router.post('/login', authController.login);
     router.post('/register', authController.register);
     router.get('/validate-email/:token', authController.validateEmail);


    return router;
  }


}

