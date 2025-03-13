import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './events.service';
import { CreateEventDto, QueryTaskDto } from './events.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUserId } from 'src/decorators/current-user-id.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('events')
export class EventController {
  constructor(private readonly taskService: EventService) {}

  @Get()
  async getEvents(
    @CurrentUserId() userId: string,
    @Query() query: QueryTaskDto,
  ) {
    return await this.taskService.getEvents({ query, userId });
  }

  @Post()
  async createEvent(
    @CurrentUserId() userId: string,
    @Body() dto: CreateEventDto,
  ) {
    return await this.taskService.createEvent({ data: dto, userId });
  }

  @Put(':id')
  async updateEvent(
    @CurrentUserId() userId: string,
    @Param('id') id: string,
    @Body() dto: CreateEventDto,
  ) {
    return await this.taskService.updateEvent({ id, data: dto, userId });
  }

  @Delete(':id')
  async deleteEvent(@CurrentUserId() userId: string, @Param('id') id: string) {
    return await this.taskService.deleteEvent({ id, userId });
  }
}
