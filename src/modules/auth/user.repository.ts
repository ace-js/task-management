import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException
} from '@nestjs/common';

import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    await user.hashPassword(password);

    try {
      await user.save();
    } catch (e) {
      if (e.code === '23505') { // duplicate username
        throw new ConflictException('Username already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<User | null> {
    const { username, password } = authCredentialsDto;

    const user = await this.findOne({ username });

    if(!user || ! await user.validatePassword(password))
      return null;

    return user
  }
}