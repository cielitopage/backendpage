import { CategoryModel } from "../../data";
import { CreateCategoryDto, CustomError, PaginationDto, UserEntity } from "../../domain";

export class CategoryService {

    constructor(

    ) { }


    async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {

        const categoryExists = await CategoryModel.findOne({ name: createCategoryDto.name });
        if (categoryExists) {
            throw CustomError.badRequest('Category already exists');
        }

        try {
            const category = new CategoryModel({ ...createCategoryDto, user: user.id });
            await category.save();
            return category;
        } catch (error) {
            throw CustomError.internalServerError('Error creating category');
        }


    }

    async getCategories( paginationDto: PaginationDto ) {
        const { page, limit } = paginationDto;
       

        try {
            // const categories = await CategoryModel.find({ available: true }).populate('user', 'name')
            // .skip((page - 1) * limit)
            // .limit(limit);

            // const total = await CategoryModel.countDocuments({ available: true });

            const [categories, total] = await Promise.all([
                CategoryModel.find({ available: true }).populate('user', 'name')
                    .skip((page - 1) * limit)
                    .limit(limit),
                CategoryModel.countDocuments({ available: true })
            ]);


            return {
                page,
                limit,
                next: total > (page * limit),
                prev: page > 1,                
                categories,
                total

            }


        } catch (error) {
            throw CustomError.internalServerError('Error getting categories');
        }



      

    }

    async getCategory(id: string) {
        try {
            const category = await CategoryModel.findById(id).populate('user', 'name');
            return category;
        } catch (error) {
            throw CustomError.internalServerError('Error getting category');


        }
    }

    async updateCategory(id: string, createCategoryDto: CreateCategoryDto) {
        try {
            const category = await CategoryModel.findByIdAndUpdate(id, createCategoryDto, { new: true }).populate('user', 'name');
            return category;
        } catch (error) {
            throw CustomError.internalServerError('Error updating category');
        }
    }

    async deleteCategory(id: string) {

        try {
            const category = await CategoryModel.findByIdAndDelete(id);
            return category;
            
        } catch (error) {
            throw CustomError.internalServerError('Error deleting category');
        }

    }   



}