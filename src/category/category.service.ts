import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entity/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) { }

    /**
     * 카테고리 정보 생성
     * --
     * @param categoryInfo
     * @returns
     */
    async createCategory(categoryInfo: CreateCategoryDto) {
        try {
            const result = await this.categoryRepository.save(categoryInfo);
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * 카테고리 전체 목록 조회
     * --
     * @returns
     */
    async getCategoryList() {
        try {
            const result = await this.categoryRepository.find();
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * 카테고리 정보 수정
     * --
     * @param categoryInfo
     * @returns
     */
    async updateCategory(categoryInfo: UpdateCategoryDto) {
        try {
            const { category_id, ...updateInfo } = categoryInfo;

            const result = await this.categoryRepository.update({ category_id }, updateInfo);
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * 카테고리 정보 삭제
     * --
     * @param category_id
     * @returns
     */
    async deleteCategory(category_id: string) {
        try {
            await this.categoryRepository.findOneOrFail({ where: { category_id } });

            const result = await this.categoryRepository.delete({ category_id });
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * 유저 상세 정보 조회
     * @param category_id
     * @returns
     */
    async getCategoryInfo(category_id: string) {
        try {
            const category = await this.categoryRepository.findOneOrFail({
                where: { category_id: category_id },
            });
            return category;
        } catch (error) {
            throw error;
        }
    }
}
