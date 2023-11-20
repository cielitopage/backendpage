


import { Request, Response } from 'express';
import {   CreateProductDto, CustomError, LoginUserDto, PaginationDto, RegisterUserDto } from '../../domain';
import { ProductService } from '../services/product.service';






export class ProductController {

    constructor(
        private readonly  productService: ProductService
     
    ) { }

    private handleErrors=(error:unknown, res:Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Error interno del servidor' });

    }


    createProduct= async (req: Request, res: Response) => {
        const [error, createCategoryDto]  =CreateProductDto.create(req.body);

        if (error) {
            return res.status(400).json({ message: error });
        }

        this.productService.createProduct(createCategoryDto!,req.body.user)
        .then((product) => {
            res.json({ message: product,
                user: {
                 id: req.body.user.id,
                  name: req.body.user.name,
                },
              
                token: req.body.token });
        })
        .catch((error) => {
            this.handleErrors(error,res);
        });          
        
    }

    getProducts= async (req: Request, res: Response) => {

        const {page,limit}=req.query;
        console.log(page,limit);

        const [error, paginationDto] = PaginationDto.create(+page!, +limit!);

        if (error) {
            return res.status(400).json({ message: error });
        }        

        this.productService.getProducts(paginationDto!)
        .then((products) => {
            res.json({ message: products });
        })
        .catch((error) => {
            this.handleErrors(error,res);
        });   
   

    }

    getProduct= async (req: Request, res: Response) => {

        const { id } = req.params;

        this.productService.getProduct(id)
        .then((product) => {
            res.json({ message: product });
        })
        .catch((error) => {
            this.handleErrors(error,res);
        });

        
    

    }

    updateProduct= async (req: Request, res: Response) => {

        const { id } = req.params;
        const [error, createProductDto] = CreateProductDto.create(req.body);

        if (error) {
            return res.status(400).json({ message: error });
        }

        this.productService.updateProduct(id, createProductDto!)
        .then((product) => {
            res.json({ message: product });
        })
        .catch((error) => {
            this.handleErrors(error,res);
        });

    }

    deleteProduct= async (req: Request, res: Response) => {
       
        const { id } = req.params;

        this.productService.deleteProduct(id)
        .then((product) => {
            res.json({ message: product });
        })
        .catch((error) => {
            this.handleErrors(error,res);
        });
    }


    

}


