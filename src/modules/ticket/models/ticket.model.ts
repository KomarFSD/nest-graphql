import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TicketModel {
  @Field()
  @IsString()
  @IsNotEmpty()
  section: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  seat: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  row: string;
}
