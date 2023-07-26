import { Test } from '@nestjs/testing';

import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';

describe('TicketsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/tickets/:id (GET) should return tickets for a given event id', async () => {
    const eventId = 1195;

    const response = await request(app.getHttpServer()).get(
      `/tickets/${eventId}`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('/tickets/:id (GET) should handle invalid argument', async () => {
    const invalidEventId = 'invalid-id';

    const response = await request(app.getHttpServer()).get(
      `/tickets/${invalidEventId}`,
    );

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'Validation failed (numeric string is expected)',
    );
  });

  it('/tickets/:id (GET) should handle not found event', async () => {
    const nonExistentEventId = 999999;

    const response = await request(app.getHttpServer()).get(
      `/tickets/${nonExistentEventId}`,
    );

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(
      `Not found any event with identifier ${nonExistentEventId}`,
    );
  });
});
