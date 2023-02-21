import { Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { AdminService } from "./admin.service";

@Controller("admin")
export class AdminController {
  constructor(private adminService: AdminService) {}
  @Get("/")
  async getAdminlist(@Res() res: Response) {
    try {
      const result = await this.adminService.getAdminList();
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: result,
        message: "Success",
      });
    } catch (error) {
      // 400 -> Client Fault
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: "Failure",
      });
    }
  }
}
