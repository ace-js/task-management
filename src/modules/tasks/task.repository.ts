import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDto: GetTaskFilterDto, userId: number): Promise<Array<Task>> {
    const { search, status } = filterDto;
    const query = this.createQueryBuilder('task');

    query.where('task.userId =:userId', { userId });

    if (status)
      query.andWhere('task.status = :status', { status });

    if (search)
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });

    return await query.getMany();
  }

  async createTask(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();

    task.description = description;
    task.title = title;
    task.status = TaskStatus.OPEN;
    task.userId = userId;

    await task.save();

    return task;
  }
}