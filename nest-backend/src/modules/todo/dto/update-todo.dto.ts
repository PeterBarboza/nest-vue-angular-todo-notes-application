import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTodoDTO {
  @IsString()
  @IsNotEmpty()
  content: string;
}
