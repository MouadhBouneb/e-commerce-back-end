/* eslint-disable prettier/prettier */
import { MinLength ,MaxLength, IsNotEmpty} from 'class-validator';
import { User } from 'src/models/user';

export class CreateLogDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  action: string;

  @IsNotEmpty()
  @MaxLength(150)
  @MinLength(10)
  description: string;

  @IsNotEmpty()
  type: number;

  @IsNotEmpty()
  user: User;
}
