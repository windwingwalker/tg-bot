import axios from "axios";

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
  bot: any;
  chatId: number;
  messageIdList: number[];
  messageTimeout: number; //In seconds

  constructor(bot: any, chatId: number, firstMessageId: number, messageTimeout: number){
    this.bot = bot;
    this.chatId = chatId;
    this.messageIdList = [firstMessageId];
    this.messageTimeout = messageTimeout;
  }

  sendMessage = async (message: string): Promise<void> => {
    var { message_id } = await this.bot.sendMessage(this.chatId, message);
    this.messageIdList.push(message_id);
  }

  deleteMessages = (): void => {
    setTimeout(() => {
      for (const messageId of this.messageIdList) {
        this.bot.deleteMessage(this.chatId, messageId)
      }
    },this.messageTimeout * 1000);
  }

  // getMessage = async (res: object, field: string, messageIdList: Array<number>) => {
  //   var { text, message_id } = await new Promise(resolve => {
  //     this.bot.onText(/.*/, response => resolve(response));
  //   });
  //   res[field] = text
  //   messageIdList.push(message_id)
  // }

  downloadFile = async (fileId: string) => {
    const link: string = await this.bot.getFileLink(fileId);
    const response: any = await axios.get(link,{ responseType: 'blob',});
    const file: any = response.data;
    return file
  }

}