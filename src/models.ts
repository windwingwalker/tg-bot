import axios, { AxiosResponse } from "axios";
import { Telegraf, Telegram, Markup } from "telegraf";

export interface Chat{
  id: number,
  first_name: string,
  username: string,
  type: string
}

export interface Message {
  message_id: number,
  from: object,
  chat: Chat,
  date: number,
}

export interface TextMessage extends Message{
  text: string,
  entities: any
}

export interface Document{
  file_name: string,
  mime_type: string,
  file_id: string,
  file_unique_id: string,
  file_size: number
}

export interface DocumentMessage extends Message{
  document: Document
}

export class TgWrapper{
  bot: Telegraf;
  chatId: number;
  messageIdList: number[];
  messageTimeout: number; //In seconds

  constructor(bot: Telegraf, chatId: number, firstMessageId: number, messageTimeout: number){
    this.bot = bot;
    this.chatId = chatId;
    this.messageIdList = [firstMessageId];
    this.messageTimeout = messageTimeout;
  }

  sendMessage = async (message: string): Promise<void> => {
    var { message_id } = await this.bot.telegram.sendMessage(this.chatId, message);
    this.messageIdList.push(message_id);
  }

  deleteMessages = (): void => {
    setTimeout(() => {
      for (const messageId of this.messageIdList) {
        this.bot.telegram.deleteMessage(this.chatId, messageId)
      }
    },this.messageTimeout * 1000);
  }

  sendInlineKeyboard = async (message: string, inlineKeyboard: any): Promise<void> => {
    var { message_id } = await this.bot.telegram.sendMessage(this.chatId, message, inlineKeyboard);
  }

  downloadFile = async (fileId: string) => {
    const link: URL = await this.bot.telegram.getFileLink(fileId);
    const response: AxiosResponse = await axios.get(link.toString(),{ responseType: 'blob',});
    const file: any = response["data"];

    if (!file) throw new Error("Fail to download file from TG official server");
    else return file
  }

  // getMessage = async (res: object, field: string, messageIdList: Array<number>) => {
  //   var { text, message_id } = await new Promise(resolve => {
  //     this.bot.onText(/.*/, response => resolve(response));
  //   });
  //   res[field] = text
  //   messageIdList.push(message_id)
  // }



}