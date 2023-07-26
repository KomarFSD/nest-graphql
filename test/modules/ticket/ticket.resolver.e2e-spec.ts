import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module'; // Замініть на шлях до вашого AppModule
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('TicketResolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Замініть AppModule на вашу головну модуль додатку
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return an array of tickets when querying by event ID', async () => {
    const eventId = 1195; // Замініть на дійсний ID події для перевірки

    const response = await request(app.getHttpServer())
      .post('/graphql') // Адреса GraphQL сервера
      .send({
        query: `
          query {
            getTicketsByEventId(id: ${eventId}) {
              price
              row
              seat
              section
            }
          }
        `,
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should return a error when querying by event ID', async () => {
    const eventId = 999999;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            getTicketsByEventId(id: ${eventId}) {
              price
              row
              seat
              section
            }
          }
        `,
      });

    expect(response.body.errors[0].message).toBe(
      `Not found any event with identifier ${eventId}`,
    );
    expect(response.body.errors[0].extensions.status).toBe(404);
  });

  it('should return a error when querying by event invalid ID', async () => {
    const eventId = 'string'; // Замініть на дійсний ID події для перевірки

    const response = await request(app.getHttpServer())
      .post('/graphql') // Адреса GraphQL сервера
      .send({
        query: `
          query {
            getTicketsByEventId(id: ${eventId}) {
              price
              row
              seat
              section
            }
          }
        `,
      });

    expect(response.body.errors[0].message).toBe(
      `Float cannot represent non numeric value: ${eventId}`,
    );
    expect(response.body.errors[0].extensions.code).toBe(
      'GRAPHQL_VALIDATION_FAILED',
    );
  });
});
