import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {
  }

  async getTasks(filterDto: GetTaskFilterDto): Promise<Array<Task>> {
    return this.taskRepository.getTasks(filterDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (!task)
      throw new NotFoundException();

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDto);
  }


  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    try {
      const task = await this.getTaskById(id);
      task.status = status;
      await task.save();
      return task;
    } catch (e) {
      throw new BadRequestException(`No status to update for task with an ID of "${id}"`);
    }
  }

  async deleteTask(id: number): Promise<void> {
    try {
      const task = await this.getTaskById(id);
      await task.remove();
    } catch (e) {
      throw  new BadRequestException(`No task to delete with an ID of "${id}"`);
    }
  }
}
