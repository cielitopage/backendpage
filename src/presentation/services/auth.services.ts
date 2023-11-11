import { envs, jwtToken, regularExps } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import bcrypt from 'bcryptjs';
import { EmailService } from "./email.service";



export class AuthServices {

    constructor(   
        private readonly emailService: EmailService, 

    ) { }



  public async registerUser(registerUserDto: RegisterUserDto) {
         // Validar que el email no exista
         const existUser = await UserModel.findOne({ email: registerUserDto.email});
         if (existUser)  throw CustomError.conflict('El email ya existe'); 
            // Validar el email
            if (!regularExps.email.test(registerUserDto.email)) {
                throw CustomError.badRequest('El email no es válido');
            }
            // Validar el password
            if (registerUserDto.password.length < 6) {
                throw CustomError.badRequest('El password debe tener al menos 6 caracteres');
            }
            // Encriptar el password
            const salt = await bcrypt.genSalt(10);
            registerUserDto.password = await bcrypt.hash(registerUserDto.password, salt);  

            try {
                const newUser = new UserModel(registerUserDto);
                await newUser.save();


                // Enviar el email de validación

                 await this.sendEmail(newUser.email);


                const { password, ...userEntity} = UserEntity.fromObject(newUser);  
                const token = await jwtToken.createToken({ id: newUser.id , email: newUser.email, name: newUser.name, role: newUser.role});

                if (!token) {
                    throw CustomError.internalServerError('Error al generar el token');
                }       

                return { user: userEntity,
                         token: token
                       };
            }
            catch (error) {
                throw CustomError.internalServerError( `${error}`);
            }    
    }


    
    public async loginUser(loginUserDto: LoginUserDto) {    
        // Validar el email 
        if (!regularExps.email.test(loginUserDto.email)) {
        throw CustomError.badRequest('El email no es válido');
        }    
        // Validar que el email exista
        const user = await UserModel.findOne({ email: loginUserDto.email });
        if (!user) {
        throw CustomError.badRequest('El email no existe');
        }    
        // Validar el password
        const validPassword = await bcrypt.compare(loginUserDto.password, user.password);
        if (!validPassword) {
        throw CustomError.badRequest('El password no es válido');
        }
        const { password, ...userEntity} = UserEntity.fromObject(user);

        const token = await jwtToken.createToken({ id: user.id , email: user.email, name: user.name, role: user.role});

        if (!token) {
            throw CustomError.internalServerError('Error al generar el token');
        }

        // Retornar el usuario
         return { user: userEntity,
               token: token
              };     

    }

    

    public validateEmail = async(token: string) => {

        const payload = await jwtToken.verifyToken(token);
        if (!payload) {
            throw CustomError.badRequest('El token no es válido');
        }
        const {  email } = payload as { email: string };
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw CustomError.badRequest('El email no existe');
        }        
        user.emailVerified = true;
        await user.save();

        return true;
    
    }

   private sendEmail = async(email: string) => {
        const token = await jwtToken.createToken({ email });
        if (!token) {
            throw CustomError.internalServerError('Error al generar el token');
        }
        const url = `${envs.WEB_URL}/auth/validate-email/${token}`;
        const html = `
        <h1>Valida tu email</h1>
        <p>Para validar tu email, haz click <a href="${url}">aquí</a></p>
        <p>Si no has solicitado validar tu email, ignora este mensaje</p>`;
        const options = {
            to: email,
            subject: 'Valida tu email',
            htmlBody: html,
        };

      const isSent = await this.emailService.sendEmail(options);

        if (!isSent) {
            throw CustomError.internalServerError('Error al enviar el email');
        }

        return true;
    }

    // static async resetPassword(email: string, password: string): Promise<boolean> {

    //     // Validar el email
    //     if (!regularExps.email.test(email)) {
    //     throw new CustomError('El email no es válido', 400);
    //     }
    
    //     // Validar que el email exista
    //     const user = await User.findOne({ email });
    //     if (!user) {
    //     throw new CustomError('El email no existe', 400);
    //     }
    
    //     // Validar el password
    //     if (password.length < 6) {
    //     throw new CustomError('El password debe tener al menos 6 caracteres', 400);
    //     }

    //     // Encriptar el password
    //     const salt = await bcrypt.genSalt(10);
    //     user.password = await bcrypt.hash(password, salt);
    //     await user.save();
    
    //     // Retornar el usuario
    //     return true;
    
    // }

}