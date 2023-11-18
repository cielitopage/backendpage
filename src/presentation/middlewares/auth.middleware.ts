
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtToken } from '../../config';
import { UserModel } from '../../data';
import { UserEntity } from '../../domain';

export class AuthMiddleware {

    static async validateToken(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header('Authorization');

        if (!authorization) {
            return res.status(401).json({ message: 'Token is required' });
        }

        if (!authorization.startsWith('Bearer')) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const token = authorization.split(' ')[1] || '';

        try {
            const payload = await jwtToken.verifyToken<{ id: string }>(token);
            if (!payload) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            const user = await UserModel.findById(payload.id);
            if (!user) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            // todo: validar si el usuario esta activo

            req.body.user = UserEntity.fromObject(user);
            next();
            
        }
        catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
      

    }

}