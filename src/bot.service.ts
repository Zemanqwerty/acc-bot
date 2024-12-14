import { Injectable, OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramBotService implements OnModuleInit {
  private bot: TelegramBot;

  onModuleInit() {
    this.bot = new TelegramBot('6892473151:AAF8oEEOmAxoRbVvYXOPgGc0f3rdqfb1ahw', { polling: true });

    this.bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;

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