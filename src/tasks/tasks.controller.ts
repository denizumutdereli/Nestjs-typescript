/*eslint-disable */
import { Controller, Body, Get, Post } from '@nestjs/common';
import {TasksService} from './tasks.service';
import {Task} from './task.model';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}
   
    @Get()
    async getAllTasks(): Promise<Task[]> {
        return this.taskService.getAllTasks();
    }

    @Post()
    async createTask(@Body('title') title: string, @Body('description') description: string) : Promise<Task> {
        return this.taskService.createTask(title, description);
    }


}
