import { Router } from 'express';

import { AuthMiddleware } from '../middlewares/auth.middleware';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { ProductController } from './controller';


export class ProductRoutes {

  static get routes(): Router {

    const router = Router();

    
    const productservice = new ProductService();
    const productController = new ProductController(productservice);
    
    // Definir las rutas
    router.get('/', productController.getProducts);
    router.get('/:id', productController.getProduct);
    router.post('/',[AuthMiddleware.validateToken],productController.createProduct);
    router.put('/:id',[AuthMiddleware.validateToken], productController.updateProduct);
    router.delete('/:id',[AuthMiddleware.validateToken], productController.deleteProduct);


    return router;
  }

}

