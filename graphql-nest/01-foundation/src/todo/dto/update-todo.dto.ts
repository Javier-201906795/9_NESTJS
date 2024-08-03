import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateTodoDto extends PartialType(CreateTodoDto) {

    @IsBoolean()
    @IsOptional()
    done?: boolean;

}
