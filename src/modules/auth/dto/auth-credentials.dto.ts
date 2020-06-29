import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty()

  @Length(4, 20)
  username: string;

  @ApiProperty()
  @IsString()
  @Length(8, 20)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'Password is too weak!',
    })
  password: string;
}