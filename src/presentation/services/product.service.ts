import { ProductModel} from "../../data";
import { CreateProductDto, CustomError, PaginationDto, UserEntity } from "../../domain";

export class ProductService {

    constructor(

    ) { }


    async createProduct(createProductDto: CreateProductDto, user: UserEntity) {

        const productExists = await ProductModel.findOne({ name: createProductDto.name });
        if (productExists) {
            throw CustomError.badRequest('Product already exists');
        }

        try {
            const product = new ProductModel({ ...createProductDto, user: user.id });
            await product.save();
            return product;
        } catch (error) {
            throw CustomError.internalServerError('Error creating product');
        }


    }

    async getProducts( paginationDto: PaginationDto ) {
        const { page, limit } = paginationDto;      

        try {
            const [products, total] = await Promise.all([
                ProductModel.find({ available: true })
                .populate('user', 'name')
                .populate('category', 'name')
                    .skip((page - 1) * limit)
                    .limit(limit),
                ProductModel.countDocuments({ available: true })
            ]);
            return {
                page,
                limit,
                next: total > (page * limit),
                prev: page > 1,                
                products,
                total
            }

        } catch (error) {
            throw CustomError.internalServerError('Error getting products');
        }    

    }

    async getProduct(id: string) {
        try {
            const product = await ProductModel.findById(id).populate('user', 'name');
            return product;
        } catch (error) {
            throw CustomError.internalServerError('Error getting category');


        }
    }

    async updateProduct(id: string, createProductDto: CreateProductDto) {
        try {
            const product = await ProductModel.findByIdAndUpdate(id, createProductDto, { available: true }).populate('user', 'name');
            return product;
        } catch (error) {
            throw CustomError.internalServerError('Error updating category');
        }
    }

    async deleteProduct(id: string) {

        try {
            const product = await ProductModel.findByIdAndDelete(id);
            return product;
            
        } catch (error) {
            throw CustomError.internalServerError('Error deleting category');
        }

    }   



}