import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProjectmemberDto {
    @IsString()
    @IsOptional()
    user_id?:string;

    @IsString()
    @IsOptional()
    project_id?:string;

    @IsNumber()
    @IsOptional()
    member_status?: boolean;
}