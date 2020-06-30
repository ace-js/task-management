import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt.payload';
import { AuthSuccessDto } from './dto/auth-success.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService) {
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<AuthSuccessDto> {
    const user = await this.userRepository.signIn(authCredentialsDto);

    if (!user)
      throw new UnauthorizedException();

    const payload: JwtPayload = { username: user.username };

    return { accessToken: this.jwtService.sign(payload) } as AuthSuccessDto;
  }
}
