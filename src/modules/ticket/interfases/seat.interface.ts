export interface SeatBase {
  SeatNumber: number;
  SeatRow: string;
  ZoneId: number;
}

export interface Seat extends SeatBase {
  SeatStatusId: number;
}
