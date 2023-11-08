import { regularExps } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";
import bcrypt from 'bcryptjs';



export class AuthServices {

    constructor(    

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
                const { password, ...userEntity} = UserEntity.fromObject(newUser);  

                return { user: userEntity,
                         token: 'token'
                       };
            }
            catch (error) {
                throw CustomError.internalServerError( `${error}`);
            }    
    }
    
    // static async loginUser(loginUserDto: LoginUserDto): Promise<LoginUserDto> {
    
    //     // Validar el email
    //     if (!regularExps.email.test(loginUserDto.email)) {
    //     throw new CustomError('El email no es válido', 400);
    //     }
    
    //     // Validar el password
    //     if (loginUserDto.password.length < 6) {
    //     throw new CustomError('El password debe tener al menos 6 caracteres', 400);
    //     }
    
    //     // Validar que el email exista
    //     const user = await User.findOne({ email: loginUserDto.email });
    //     if (!user) {
    //     throw new CustomError('El email no existe', 400);
    //     }
    
    //     // Validar el password

    //     const isMatch = await bcrypt.compare(loginUserDto.password, user.password);

    //     if (!isMatch) {
    //         throw new CustomError('La contraseña es incorrecta', 400);
    //     }

    //     // Retornar el usuario

    //     return user;

    // }

    // static async validateEmail(email: string): Promise<boolean> {

    //     // Validar el email
    //     if (!regularExps.email.test(email)) {
    //     throw new CustomError('El email no es válido', 400);
    //     }
    
    //     // Validar que el email exista
    //     const user = await User.findOne({ email });
    //     if (!user) {
    //     throw new CustomError('El email no existe', 400);
    //     }
    
    //     // Retornar el usuario
    //     return true;
    
    // }

    // static async sendEmail(email: string): Promise<boolean> {

    //     // Validar el email
    //     if (!regularExps.email.test(email)) {
    //     throw new CustomError('El email no es válido', 400);
    //     }
    
    //     // Validar que el email exista
    //     const user = await User.findOne({ email });
    //     if (!user) {
    //     throw new CustomError('El email no existe', 400);
    //     }
    
    //     // Retornar el usuario
    //     return true;
    
    // }

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