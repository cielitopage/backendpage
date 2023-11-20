import { Validators } from "../../../config";



export class CreateProductDto {

    private constructor(
        public readonly name: string,
        public readonly edad: string,   
        public readonly description: string,
        public readonly category: string,
        public readonly available: boolean
    ) { }

    static create( object: { [key: string]: any } ) : [string? , CreateProductDto?] {

        const { name, edad, description, category, available } = object;
        let availableBoolean = available;        

        if (!name) {
            return ['Name is required'];
        }

        if (!edad) {
            return ['Edad is required'];
        }

        if (!description) {
            return ['Description is required'];
        }

        if (!category) {
            return ['Category is required'];
        }

        if (!Validators.isMongoId(category)) {
            return ['Category is invalid'];
        }

      

        if (typeof available !== 'boolean') {
            availableBoolean = (available === 'true');
        }



            return [undefined, new CreateProductDto(name, edad, description, category, availableBoolean)];

      }


}