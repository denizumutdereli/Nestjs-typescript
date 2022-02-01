/*eslint-disable */
import { Controller, Query, Body, Get, Post, Patch, Delete, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { createTaskDTO } from './dto/create-task-dto';
import { getTasksFilterDTO } from './dto/get-tasks-dto'

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    async getTasks(@Query() filterDTO: getTasksFilterDTO): Promise<Task[]> {
        if (Object.keys(filterDTO).length) { //we have filters
            console.log(filterDTO);
            return this.taskService.getTasksWithFilter(filterDTO);
        } else return this.taskService.getAllTasks();
    }

    @Post()
    // async createTask(@Body('title') title: string, @Body('description') description: string) : Promise<Task> {
    //     return this.taskService.createTask(title, description);
    // }
    async createTask(@Body() createTaskDTO: createTaskDTO): Promise<Task> { //shorthand and more safe transferring data interfaces
        return this.taskService.createTask(createTaskDTO);
    }

    @Get('/:id')
    async getTaskById(@Param('id') id: string | number): Promise<Task> {
        return this.taskService.getTaskById(id)
    }

    @Delete('/:id')
    async deleteTaskById(@Param('id') id: string | number): Promise<boolean> { //shorthand and more safe transferring data interfaces}[]>{
        return (this.taskService.deleteTaskById(id)) ? true : false
    }

    @Patch('/:id/status')
    async updateTaskStatus(@Param('id') id: string | number, @Body('status') status: TaskStatus): Promise<Task> { //shorthand and more safe}
        return this.taskService.updateTaskStatus(id, status)
    }



}
