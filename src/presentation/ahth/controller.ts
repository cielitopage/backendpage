


import { Request, Response } from 'express';




export class AuthController {

    constructor() { }   

   async login(req: Request, res: Response) {
        // TODO
        res.json({message: 'login'});


    }

   async register(req: Request, res: Response) {
        // TODO

        res.json({message: 'register'});


    }

    async validateEmail(req: Request, res: Response) {
        // TODO

        res.json({message: 'validateEmail'});
    }



}