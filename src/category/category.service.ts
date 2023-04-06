import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityBadRequestException } from 'src/config/service.exception';
import { Category } from 'src/entity/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}

  /**
   * 카테고리 정보 생성
   * --
   * @param categoryInfo
   * @returns
   */
  async createCategory(categoryInfo: CreateCategoryDto) {
    try {
      if (categoryInfo.category_id) {
        const { category_id } = categoryInfo;
        const check = await this.categoryRepository.findOne({
          where: { category_id: category_id },
        });
        if (check) {
          throw EntityBadRequestException();
        }
      }

      const test = this.categoryRepository.create(categoryInfo);
      const result = await this.categoryRepository.save(test);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 카테고리 전체 목록 조회
   * --
   * @returns
   */
  async getCategoryList() {
    try {
      const result = await this.categoryRepository.find({
        order: { category_level: 'ASC' },
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  async getCatgoryTree() {
    try {
      const parent = await this.categoryRepository.find({
        where: { category_level: 0 },
        order: { category_order: 'ASC' },
      });
      const childPromise = parent.map(async (item) => {
        const { category_id } = item;
        const child = await this.categoryRepository.find({
          where: { parent_id: category_id },
          order: { category_order: 'ASC' },
        });
        return { ...item, child };
      });
      const result = await Promise.all(childPromise);

      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 카테고리 상세 정보 조회
   * @param category_id
   * @returns
   */
  async getCategoryInfo(category_id: string) {
    try {
      const category = await this.categoryRepository.findOneOrFail({
        where: { category_id: category_id },
      });
      return category;
    } catch (e) {
      throw e;
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

      const result = await this.categoryRepository.update(
        { category_id },
        updateInfo
      );
      return result;
    } catch (e) {
      throw e;
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
    } catch (e) {
      throw e;
    }
  }
}
