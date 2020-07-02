import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';

import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private readonly logger: Logger;

  constructor() {
    super();
    this.logger = new Logger('TaskRepository');
  }

  async getTasks(filterDto: GetTaskFilterDto, userId: number): Promise<Array<Task>> {
    const { search, status } = filterDto;
    const query = this.createQueryBuilder('task');

    query.where('task.userId =:userId', { userId });

    if (status)
      query.andWhere('task.status = :status', { status });

    if (search)
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });

    try {
      return await query.getMany();
    } catch (e) {
      this.logger.error(`Failed to get tasks for user "${userId}", DTO: ${JSON.stringify(filterDto)}`, e.stack);
      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();

    task.description = description;
    task.title = title;
    task.status = TaskStatus.OPEN;
    task.userId = userId;

    try {
      await task.save();
    } catch (e) {
      this.logger.error(`Failed to create a task for user "${userId}", Data: ${createTaskDto}`, e.stack)
      throw new InternalServerErrorException();
    }

    return task;
  }
}