/*eslint-disable */
import { Controller, Body, Get, Post, Put, Delete, Param } from '@nestjs/common';
import {TasksService} from './tasks.service';
import {Task} from './task.model';
import { createTaskDTO } from './dto/create-task-dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}
   
    @Get()
    async getAllTasks(): Promise<Task[]> {
        return this.taskService.getAllTasks();
    }

    @Post()
    // async createTask(@Body('title') title: string, @Body('description') description: string) : Promise<Task> {
    //     return this.taskService.createTask(title, description);
    // }
    async createTask(@Body() createTaskDTO: createTaskDTO) : Promise<Task>{ //shorthand and more safe transferring data interfaces
        return this.taskService.createTask(createTaskDTO);
    }

    @Get('/:id')
    async getTaskById(@Param('id') id: string | number): Promise<Task>{
        return this.taskService.getTaskById(id)
    }


}
