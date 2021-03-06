import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmSqlConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true
};

export const typeOrmPostgresConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'taskManagement',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true
}
