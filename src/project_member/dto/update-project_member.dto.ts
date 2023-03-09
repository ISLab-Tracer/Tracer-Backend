import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class UpdateProjectmemberDto{
    @IsString()
    @IsNotEmpty()
    user_id: string;

    @IsString()
    @IsNotEmpty()
    project_id:string;

    @IsNumber()
    @IsOptional()
    member_status?: boolean;
}