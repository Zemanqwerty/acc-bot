import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as TelegramBot from 'node-telegram-bot-api';
import { CreateUser } from './dto/creareUser.dto';

@Injectable()
export class TelegramBotService implements OnModuleInit  {

  constructor(@Inject('RABBITMQ_SERVICE') private client: ClientProxy) {}

  private bot: TelegramBot;

  async createUser(userTgId: string, userTgUsername: string) {
    const userData = new CreateUser(userTgUsername, userTgId);

    return await this.client.emit('createUserFomTg', userData).toPromise(); // Отправка сообщения
  }

  onModuleInit() {
    this.bot = new TelegramBot('6892473151:AAF8oEEOmAxoRbVvYXOPgGc0f3rdqfb1ahw', { polling: true });

    this.bot.onText(/\/start/, async (msg: any) => {
      const chatId = msg.chat.id;
      const userTgId = msg.from.id.toString(); // ID пользователя
      const userTgUsername = msg.from.username || 'NoUsername'; // Username пользователя

      // Вызов функции createUser с данными пользователя
      await this.createUser(userTgId, userTgUsername);

      const inlineKeyboard = {
        inline_keyboard: [
          [
            {
              text: 'Open Mini App',
              web_app: { url: 'https://google.com' },
            },
          ],
        ],
      };

      this.bot.sendMessage(chatId, 'Welcome to the Mini App!', {
        reply_markup: inlineKeyboard,
      });
    });
  }
}