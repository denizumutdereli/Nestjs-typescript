/*eslint-disable */
import { Controller, Get } from '@nestjs/common';
import {TasksService} from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}
    getAllTasks() {
        return this.taskService.getAllTasks();
    }

}
