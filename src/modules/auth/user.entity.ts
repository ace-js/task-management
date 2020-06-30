import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Crypto } from '../../core/lib/crypto';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  async hashPassword(password: string): Promise<void>{
    this.salt = await Crypto.generateSalt();
    this.password = await Crypto.hash(password, this.salt)
  }

  async validatePassword(password: string): Promise<boolean> {
    return Crypto.isEqual(this.password, this.salt, password);
  }
}