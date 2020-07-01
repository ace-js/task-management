import {
  Body,
  Controller,
  Delete,
  Get,
  Param, ParseIntPipe,
  Patch,
  Post, Query, UseGuards, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';


@Controller('tasks')
@UseGuards(AuthGuard())
@ApiTags('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {
  }

  @Get()
  @UsePipes(ValidationPipe)
  getTasks(@Query() filterDto: GetTaskFilterDto): Promise<Array<Task>> {
    return this.tasksService.getTasks(filterDto);
  }

  @Get(':id')
  getTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @GetUser() user: User,
    @Body() createTaskDto: CreateTaskDto
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user.id);
  }


  @Patch(':id/status')
  updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body(TaskStatusValidationPipe) updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto.status);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}
