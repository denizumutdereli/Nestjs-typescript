/*eslint-disable */
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { createTaskDTO } from './dto/create-task-dto';
import { getTasksFilterDTO } from './dto/get-tasks-dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilter(filterDTO: getTasksFilterDTO): Task[] {
        const { status, search } = filterDTO;
        let tasks = this.getAllTasks();

        //filters
        if (status) tasks = tasks.filter(task => task.status === status);
        if (search) tasks = tasks.filter(task => (task.title.includes(search) || task.description.includes(search)));

        return tasks;
    }

    //createTask(title: string, description: string): Task { //single return
    createTask(createTaskDTO: createTaskDTO): Task { //single return - safe with DTO injection
        const { title, description } = createTaskDTO;
        const task: Task = {
            id: uuid.v4(),
            title,
            description,
            status: TaskStatus.OPEN,
        }

        this.tasks.push(task);
        return task;
    };

    getTaskById(id: string | number): Task {
        return this.tasks.find(task => task.id === id)
    }

    deleteTaskById(id: string | number): boolean {
        return (this.tasks = this.tasks.filter(task => task.id !== id)) ? true : false;
    }

    updateTaskStatus(id: string | number, status: TaskStatus): Task {
        const task = this.getTaskById(id)
        task.status = status
        return task;
    }

}
