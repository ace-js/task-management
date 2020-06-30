import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { BadRequestException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Crypto } from '../../core/lib/crypto';

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
      if (e.errno === 19) { // duplicate username
        throw new ConflictException('Username already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;

    const user = await this.findOne({ username });

    if(!user || ! await user.validatePassword(password))
      throw new BadRequestException();

    return username
  }
}