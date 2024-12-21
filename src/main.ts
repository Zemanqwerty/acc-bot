import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${process.env.RMQ_USER}:${process.env.RMQ_PASSWORD}@${process.env.RMQ_HOST}:${process.env.RMQ_PORT}`],
      queue: process.env.RMQ_TELEGRAM_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.listen();
  console.log('Telegram bot microservice is listening');
}
bootstrap();