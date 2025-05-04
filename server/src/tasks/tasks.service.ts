import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ActivitiesService } from '../activities/activities.service';

// This is a mock database for development
// In a real app, you would use a real database like MongoDB, PostgreSQL, etc.
const tasks = [
  { id: '1', title: 'Finish project documentation', completed: false, dueDate: 'Apr 15, 2025', userId: '1' },
  { id: '2', title: 'Deploy application to production', completed: true, dueDate: 'Apr 10, 2025', userId: '1' },
  { id: '3', title: 'Review pull requests', completed: false, dueDate: 'Apr 20, 2025', userId: '1' },
  { id: '4', title: 'Update dependencies', completed: false, dueDate: 'Apr 25, 2025', userId: '1' }
];

@Injectable()
export class TasksService {
  constructor(private activitiesService: ActivitiesService) {}

  async create(userId: string, createTaskDto: CreateTaskDto): Promise<any> {
    const newTask = {
      id: (tasks.length + 1).toString(),
      ...createTaskDto,
      userId,
    };
    tasks.push(newTask);
    
    // Create activity
    await this.activitiesService.create(userId, {
      type: 'created',
      message: `Created a new task: ${createTaskDto.title}`,
    });
    
    return newTask;
  }

  async findAll(userId: string): Promise<any[]> {
    return tasks.filter(task => task.userId === userId);
  }

  async findOne(userId: string, id: string): Promise<any> {
    const task = tasks.find(task => task.id === id && task.userId === userId);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(userId: string, id: string, updateTaskDto: UpdateTaskDto): Promise<any> {
    const index = tasks.findIndex(task => task.id === id && task.userId === userId);
    if (index === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    
    const oldTask = tasks[index];
    const updatedTask = { ...oldTask, ...updateTaskDto };
    tasks[index] = updatedTask;
    
    // Create activity if task was completed
    if (updateTaskDto.completed === true && oldTask.completed === false) {
      await this.activitiesService.create(userId, {
        type: 'completed',
        message: `Completed task: ${updatedTask.title}`,
      });
    } else if (updateTaskDto.title && updateTaskDto.title !== oldTask.title) {
      await this.activitiesService.create(userId, {
        type: 'updated',
        message: `Updated task: ${oldTask.title} to ${updateTaskDto.title}`,
      });
    }
    
    return updatedTask;
  }

  async remove(userId: string, id: string): Promise<void> {
    const index = tasks.findIndex(task => task.id === id && task.userId === userId);
    if (index === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    
    const task = tasks[index];
    tasks.splice(index, 1);
    
    // Create activity
    await this.activitiesService.create(userId, {
      type: 'deleted',
      message: `Deleted task: ${task.title}`,
    });
  }

  async getStats(userId: string): Promise<any> {
    const userTasks = tasks.filter(task => task.userId === userId);
    const completed = userTasks.filter(task => task.completed).length;
    
    return {
      projects: 5, // Mock data
      tasks: userTasks.length,
      completed,
    };
  }
}