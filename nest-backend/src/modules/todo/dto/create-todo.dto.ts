import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTodoDTO {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUUID()
  userId: string;
}
