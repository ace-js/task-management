import { Controller, Body, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';


import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthSuccessDto } from './dto/auth-success.dto';


@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private  authService: AuthService) {
  }

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<AuthSuccessDto> {
    return this.authService.signIn(authCredentialsDto);
  }
}
