import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [TasksModule],
  controllers: [StatsController],
})
export class StatsModule {}