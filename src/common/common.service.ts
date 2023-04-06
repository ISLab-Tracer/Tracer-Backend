import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { TeamService } from '../team/team.service';
import { CategoryService } from '../category/category.service';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class CommonService {
  constructor(
    private readonly userService: UserService,
    private readonly teamService: TeamService,
    private readonly categoryService: CategoryService,
    private readonly projectService: ProjectService
  ) {}

  /**
   * 공용데이터 조회
   * --
   * @returns
   */
  async getCommonData() {
    try {
      const categoryList = await this.categoryService.getCategoryList();
      const projectList = await this.projectService.getProjectList();
      const teamList = await this.teamService.getTeamList();
      const userList = await this.userService.getUserList();
      const categoryTree = await this.categoryService.getCatgoryTree();

      return { categoryList, projectList, teamList, userList, categoryTree };
    } catch (e) {
      throw e;
    }
  }
}
