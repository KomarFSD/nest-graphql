import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketsController {
  @Inject(TicketService)
  private readonly ticketService: TicketService;

  @Get(':id')
  async getTicketsByEventId(@Param('id', ParseIntPipe) id: number) {
    return this.ticketService.getTicketsByEventId(id);
  }
}
