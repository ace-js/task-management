import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any, metadata: ArgumentMetadata): any {
    const status = value?.status?.toUpperCase();

    if (!this.isValidStatus(status)) {
      throw new BadRequestException(`"${status}" is an invalid status`)
    }

    value.status = status;
    return value;
  }

  private isValidStatus(status): boolean {
    return this.allowedStatuses.includes(status);
  }
}