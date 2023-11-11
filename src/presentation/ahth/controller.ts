


import { Request, Response } from 'express';
import { CustomError, LoginUserDto, RegisterUserDto } from '../../domain';
import { AuthServices } from '../services/auth.services';




export class AuthController {

    constructor(
        private authServices: AuthServices
    ) { }

    private handleErrors=(error:unknown, res:Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Error interno del servidor' });

    }

    login=(req: Request, res: Response) => {

        const [error, loginUserDto]= LoginUserDto.login(req.body);
        if (error) {    
            return res.status(400).json({ message: error });
        }

        this.authServices.loginUser(loginUserDto!)
        .then((user) => {
            res.json({ user });
        })
        .catch((error) => {
            this.handleErrors(error, res);
        });


    }


    register=(req: Request, res: Response) => {
        const [error, registerUserDto]= RegisterUserDto.create(req.body); 
        if (error) {    
            return res.status(400).json({ message: error });
        }

        this.authServices.registerUser(registerUserDto!)
            .then((user) => {
                res.json({ user });
            })
            .catch((error) => {
                this.handleErrors(error, res);
            });
        }



    validateEmail=(req: Request, res: Response) => {

        const { token } = req.params;      

        this.authServices.validateEmail(token)
            .then(() => {
                res.json({ message: 'validateEmail' });
            })
            .catch((error) => {
                this.handleErrors(error, res);
            });             
    }



}