import { Router } from 'express';
import { AuthController } from './controller';
import { AuthServices } from '../services/auth.services';
import { EmailService } from '../services/email.service';
import { envs } from '../../config/envs';




export class Authroutes {


  static get routes(): Router {

    const router = Router();

    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,      
      );
    const authServices = new AuthServices(emailService); 
    const authController = new AuthController(authServices); 
    
    // Definir las rutas
     router.post('/login', authController.login);
     router.post('/register', authController.register);
     router.get('/validate-email/:token', authController.validateEmail);


    return router;
  }


}

