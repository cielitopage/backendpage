import { regularExps } from "../../../config";


export class LoginUserDto {

  private constructor(
     
        public  email: string,
        public  password: string,     
    ) { }

    static login (object:{[key:string]:any} ) : [string?, LoginUserDto?] {

        const {  email, password } = object;

       

        if (!email) {
            return ['email is required'];
        }

        if (!regularExps.email.test(email)) {
            return ['email is invalid'];
        }

        if (!password) {
            return ['password is required'];
        }

        if (password.length < 6) {
            return ['La contraseña debe tener al menos 6 caracteres'];
        }

        return [undefined, new LoginUserDto( email, password)];

}

}