import { IsArray, IsNumber, IsString } from "class-validator";

export class DTOUsuarios {
    @IsString()
    apodo: string;
    // @IsArray()
    // @IsString({ each: true })
    // mocos: string[];
    // @IsNumber()
    // completed: number;
}