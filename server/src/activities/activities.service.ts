import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';

// This is a mock database for development
// In a real app, you would use a real database like MongoDB, PostgreSQL, etc.
const activities = [
  { id: '1', type: 'created', message: 'Created a new task: Finish project documentation', time: '2 hours ago', userId: '1' },
  { id: '2', type: 'completed', message: 'Completed task: Deploy application to production', time: '1 day ago', userId: '1' },
  { id: '3', type: 'updated', message: 'Updated task deadline: Review pull requests', time: '3 days ago', userId: '1' }
];

@Injectable()
export class ActivitiesService {
  async create(userId: string, createActivityDto: CreateActivityDto): Promise<any> {
    const newActivity = {
      id: (activities.length + 1).toString(),
      ...createActivityDto,
      time: 'Just now',
      userId,
    };
    activities.push(newActivity);
    return newActivity;
  }

  async findAll(userId: string): Promise<any[]> {
    return activities
      .filter(activity => activity.userId === userId)
      .sort((a, b) => parseInt(b.id) - parseInt(a.id)); // Sort by newest first
  }
}