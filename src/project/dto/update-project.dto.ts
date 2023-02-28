import { IsNotEmpty, IsString } from "class-validator";

export class UpdateProjectDto{
    @IsString()
    @IsNotEmpty()
    project_id: string;

    @IsString()
    @IsNotEmpty()
    project_title?: string;

    @IsString()
    @IsNotEmpty()
    project_desc?: string;

}