import { IsUUID } from 'class-validator';

export class DeleteTodoDTO {
  @IsUUID()
  id: string;
}
