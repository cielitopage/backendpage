import { regularExps } from "../../../config";


export class RegisterUserDto {

  private constructor(
        public  name: string,
        public  email: string,
        public  password: string,     
    ) { }

    static create (object:{[key:string]:any} ) : [string?, RegisterUserDto?] {

        const { name, email, password } = object;

        if (!name) {
            return ['name is required'];
        }

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

        return [undefined, new RegisterUserDto(name, email, password)];

}

}