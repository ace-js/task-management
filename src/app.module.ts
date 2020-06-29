import { Module } from '@nestjs/common';

import { TasksModule } from './modules/tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmSqlConfig } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmSqlConfig),
    TasksModule,
    AuthModule
  ]
})
export class AppModule {}
