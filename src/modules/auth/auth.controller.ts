import { Controller, Body, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

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
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.authService.signIn(authCredentialsDto);
  }
}
