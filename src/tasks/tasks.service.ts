/*eslint-disable */
import { Injectable } from '@nestjs/common';
import {Task, TaskStatus} from './task.model';
import * as uuid from 'uuid';
import { createTaskDTO } from './dto/create-task-dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    //createTask(title: string, description: string): Task { //single return
    createTask(createTaskDTO: createTaskDTO): Task { //single return - safe with DTO injection
        const {title, description} = createTaskDTO;
        const task: Task = {
            id: uuid.v4(),
            title,
            description,
            status : TaskStatus.OPEN,
        }

        this.tasks.push(task);
        return task;
    };
 
    getTaskById(id: string | number): Task {
        return this.tasks.find( task =>  task.id === id)
    }

}
