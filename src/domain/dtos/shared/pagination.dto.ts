


export class PaginationDto {



private constructor( 
    public readonly page: number,
    public readonly limit: number,
  
    ) { }


    static create( page: number =1, limit: number =10): [string?, PaginationDto?] {

        if (page < 1) {
            return ['La página debe ser mayor a 0', undefined];
        }
        if (limit < 1) {
            return ['El límite debe ser mayor a 0', undefined];
        }
        return [undefined, new PaginationDto(page, limit)];

    }




}