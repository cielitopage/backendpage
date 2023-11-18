


import { Request, Response } from 'express';
import {  CreateCategoryDto, CustomError, LoginUserDto, PaginationDto, RegisterUserDto } from '../../domain';
import { CategoryService } from '../services/category.service';





export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService,
     
    ) { }

    private handleErrors=(error:unknown, res:Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Error interno del servidor' });

    }


    createCategory= async (req: Request, res: Response) => {
        const [error, createCategoryDto]  =CreateCategoryDto.create(req.body);

        if (error) {
            return res.status(400).json({ message: error });
        }

        this.categoryService.createCategory(createCategoryDto!,req.body.user)
        .then((category) => {
            res.json({ message: category,
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

    getCategories= async (req: Request, res: Response) => {

        const {page,limit}=req.query;
        console.log(page,limit);

        const [error, paginationDto] = PaginationDto.create(+page!, +limit!);

        if (error) {
            return res.status(400).json({ message: error });
        }        
      
      this.categoryService.getCategories(paginationDto!)
      .then((categories) => {
          res.json({ message: categories });
      })
      .catch((error) => {
          this.handleErrors(error,res);
      });

   

    }

    getCategory= async (req: Request, res: Response) => {

      this.categoryService.getCategory(req.params.id)
      .then((category) => {
          res.json({ message: category });
      })
      .catch((error) => {
          this.handleErrors(error,res);
      });
       
    

    }

    updateCategory= async (req: Request, res: Response) => {

      this.categoryService.updateCategory(req.params.id,req.body)
      .then((category) => {
          res.json({ message: category });
      })
      .catch((error) => {
          this.handleErrors(error,res);
      });
       
  

    }

    deleteCategory= async (req: Request, res: Response) => {
       
      this.categoryService.deleteCategory(req.params.id)
      .then((category) => {
          res.json({ message: category });
      })
      .catch((error) => {
          this.handleErrors(error,res);
      });

    }


    

}


