import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketResolver } from './ticket.resolver';
import { TicketsController } from './ticket.controller';
import { TicketRepository } from './ticket.repository';

@Module({
  providers: [TicketService, TicketResolver, TicketRepository],
  controllers: [TicketsController],
})
export class TicketModule {}
