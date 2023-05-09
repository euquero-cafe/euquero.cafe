import { NestFactory } from '@nestjs/core';
import { RecibosModule } from './recibos.module';

async function bootstrap() {
  const app = await NestFactory.create(RecibosModule);
  await app.listen(3000);
}

bootstrap();
