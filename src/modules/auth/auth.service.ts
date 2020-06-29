import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ username });
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username } = authCredentialsDto;
    const user = await this.getUserByUsername(username);

    if (user) {
      throw new BadRequestException(`Username "${username}" already taken`);
    }

    return this.userRepository.signUp(authCredentialsDto);
  }
}
