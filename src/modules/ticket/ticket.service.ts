import { Injectable, NotFoundException } from '@nestjs/common';
import { TicketModel } from './models/ticket.model';
import { TicketRepository } from './ticket.repository';
import { Price, Seat, Zone } from './interfases';

@Injectable()
export class TicketService {
  constructor(private ticketRepository: TicketRepository) {}

  async getTicketsByEventId(id: number): Promise<TicketModel[]> {
    await this.isValidEvent(id);
    const { seats, zones, prices } = await this.getEventsDataById(id);
    const freeSeats = seats.filter((seat) => seat.SeatStatusId === 0);
    const allZones = zones.flatMap(({ Zones }) => Zones);
    const filteredPrises = prices.filter((price) => price.PerformanceId === 0);

    return this.getTickets(freeSeats, allZones, filteredPrises);
  }

  async isValidEvent(id: number): Promise<void> {
    const event = await this.ticketRepository.getEvent(id);
    if (event?.length === 0) {
      throw new NotFoundException(`Not found any event with identifier ${id}`);
    }
  }

  async getEventsDataById(id: number) {
    const seatsPromise = this.ticketRepository.getSeats(id);
    const zonesPromise = this.ticketRepository.getZones(id);
    const pricesPromise = this.ticketRepository.getPrices(id);
    const [seats, zones, prices] = await Promise.all([
      seatsPromise,
      zonesPromise,
      pricesPromise,
    ]);

    return { seats, zones, prices };
  }

  getTickets(seats: Seat[], zones: Zone[], prices: Price[]): TicketModel[] {
    const tickets: TicketModel[] = seats.map((seat) => ({
      section: zones.find(({ Id }) => Id === seat.ZoneId)?.Description,
      row: seat.SeatRow,
      seat: seat.SeatNumber,
      price: prices.find(({ ZoneId }) => ZoneId === seat.ZoneId)?.Price,
    }));
    return tickets;
  }
}
