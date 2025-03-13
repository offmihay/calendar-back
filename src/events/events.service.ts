import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto, QueryTaskDto } from './events.dto';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async getEvents({ query, userId }: { query: QueryTaskDto; userId: string }) {
    return await this.prisma.event.findMany({
      where: {
        importance: query.importance,
        userId,
        name: {
          contains: query.search || undefined,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getEventById({ id }: { id: string }) {
    return await this.prisma.event.findUnique({
      where: {
        id,
      },
    });
  }

  async createEvent({
    data,
    userId,
  }: {
    data: CreateEventDto;
    userId: string;
  }) {
    return await this.prisma.event.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async updateEvent({
    id,
    data,
    userId,
  }: {
    id: string;
    data: CreateEventDto;
    userId: string;
  }) {
    await this.validateEventOwnership(id, userId);
    return await this.prisma.event.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteEvent({ id, userId }: { id: string; userId: string }) {
    await this.validateEventOwnership(id, userId);
    await this.prisma.event.delete({
      where: {
        id,
      },
    });
    return { message: 'Deleted successfully' };
  }

  async validateEventOwnership(id: string, userId: string) {
    const event = await this.getEventById({ id });
    if (!event || event.userId !== userId) {
      throw new NotFoundException('Event not found');
    }
  }
}
