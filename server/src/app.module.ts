import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ActivitiesModule } from './activities/activities.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TasksModule,
    ActivitiesModule,
    StatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}