import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TasksService } from '../tasks/tasks.service';

@Controller('stats')
@UseGuards(JwtAuthGuard)
export class StatsController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getStats(@Request() req) {
    return this.tasksService.getStats(req.user.id);
  }
}