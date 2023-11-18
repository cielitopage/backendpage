
import  jwt from 'jsonwebtoken';
import { envs } from './envs';


const JWT_SECRET = envs.JWT_SECRET;


export class jwtToken {

    static async createToken(payload: any, expiresIn: string = '1h') {

        return new Promise((resolve) => {

            jwt.sign(payload, JWT_SECRET, { expiresIn }, (error, token) => {
                if (error) {
                    console.log(error);
                    throw new Error('Error al generar el token');
                }
                resolve(token);
            });

        });
    }


    static verifyToken<T>(token: string): Promise<T | null> {

        return new Promise((resolve, reject) => {

            jwt.verify(token, JWT_SECRET, (error, decoded) => {
                if (error) {
                    console.log(error);
                    reject(new Error('Invalid token'));
                }
                resolve(decoded as T);
            });

        });
        
    }



}