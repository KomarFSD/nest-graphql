import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get<number>('PORT') || 3000;
  app.enableCors({
    origin: '*',
  });
  await app.listen(port, () => {
    console.log('Server running on PORT', port);
  });
}

bootstrap();
