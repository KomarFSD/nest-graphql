import { Args, Query, Resolver } from '@nestjs/graphql';
import { TicketService } from './ticket.service';
import { TicketModel } from './models/ticket.model';

@Resolver('ticket')
export class TicketResolver {
  constructor(private readonly ticketService: TicketService) {}

  @Query(() => [TicketModel])
  async getTicketsByEventId(@Args('id') id: number): Promise<TicketModel[]> {
    return await this.ticketService.getTicketsByEventId(id);
  }
}
