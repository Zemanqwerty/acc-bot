import { Module } from '@nestjs/common';
import { TelegramBotService } from './bot.service';

@Module({
  imports: [],
  controllers: [],
  providers: [TelegramBotService],
})
export class AppModule {}
