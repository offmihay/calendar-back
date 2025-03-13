import { Module } from '@nestjs/common';
import { EventController } from './events.controller';
import { EventService } from './events.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [EventController],
  providers: [EventService],
  imports: [PrismaModule, AuthModule],
})
export class EventModule {}
