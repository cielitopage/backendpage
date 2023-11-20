import { Router } from 'express';
import { CategoryController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { CategoryService } from '../services/category.service';


export class CategoryRoutes {

  static get routes(): Router {

    const router = Router();

    
    const categoryservice = new CategoryService();
    const categoryController = new CategoryController(categoryservice);
    
    // Definir las rutas
    router.get('/', categoryController.getCategories);
    router.get('/:id', categoryController.getCategory);
    router.post('/',[AuthMiddleware.validateToken],categoryController.createCategory);
    router.put('/:id',[AuthMiddleware.validateToken], categoryController.updateCategory);
    router.delete('/:id',[AuthMiddleware.validateToken], categoryController.deleteCategory);


    return router;
  }

}

