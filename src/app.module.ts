import { Module } from '@nestjs/common';

import { TasksModule } from './modules/tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmPostgresConfig } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmPostgresConfig),
    TasksModule,
    AuthModule
  ]
})
export class AppModule {}
