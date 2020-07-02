import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {
  }

  async getTasks(filterDto: GetTaskFilterDto, userId: number): Promise<Array<Task>> {
    return this.taskRepository.getTasks(filterDto, userId);
  }

  async getTaskById(id: number, userId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, userId }});

    if (!task)
      throw new NotFoundException();

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDto, userId);
  }


  async updateTaskStatus(id: number, status: TaskStatus, userId: number): Promise<Task> {
    try {
      const task = await this.getTaskById(id, userId);
      task.status = status;
      await task.save();
      return task;
    } catch (e) {
      throw new BadRequestException(`No status to update for task with an ID of "${id}"`);
    }
  }

  async deleteTask(id: number, userId: number): Promise<void> {
    try {
      const task = await this.getTaskById(id, userId);
      await task.remove();
    } catch (e) {
      throw  new BadRequestException(`No task to delete with an ID of "${id}"`);
    }
  }
}
