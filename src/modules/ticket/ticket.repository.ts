import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Price, Seat, Zones } from './interfases';

@Injectable()
export class TicketRepository {
  api = axios.create({
    baseURL: 'https://my.laphil.com/en/rest-proxy/TXN',
  });

  async getMethod<T>(url: string): Promise<T> {
    const response = await this.api.get<T>(url);
    return response.data;
  }

  async getEvent(id: number): Promise<any | any[]> {
    return await this.getMethod<any | []>(`Packages/${id}`);
  }

  async getPrices(id: number): Promise<Price[]> {
    return await this.getMethod<Price[]>(
      `Packages/${id}/Prices?modeOfSaleId=26&priceTypeId=&sourceId=30885`,
    );
  }

  async getSeats(id: number): Promise<Seat[]> {
    return this.getMethod<Seat[]>(
      `Packages/${id}/Seats?constituentId=0&modeOfSaleId=26&packageId=${id}`,
    );
  }
  async getZones(id: number): Promise<Zones[]> {
    return this.getMethod<Zones[]>(
      `PriceTypes/Details?modeOfSaleId=26&packageId=${id}&sourceId=30885`,
    );
  }
}
