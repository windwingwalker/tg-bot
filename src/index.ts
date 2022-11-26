import TelegramBot from "node-telegram-bot-api"
import { TextMessage, DocumentMessage, TgWrapper } from "./models";
import { getParameterFromSSM, isCsv, isMarkdown } from "./functions";
import uploadArticle from "./upload-article/index";
import uploadMoze from "./upload-moze/index";

const controller = async ()  => {
  try{
    const tgToken: string = await getParameterFromSSM("/tg-bot/default-token");
    const bot = new TelegramBot(tgToken, {polling: true});

    bot.onText(/\/health$/, async (msg: TextMessage) => {
      const tgWrapper = new TgWrapper(bot, msg.chat.id, msg.message_id, 10);

      console.info(msg)
      await tgWrapper.sendMessage('I am healthy');  
      tgWrapper.deleteMessages();
    })

    bot.on('document', async (msg: DocumentMessage) => {
      const tgWrapper = new TgWrapper(bot, msg.chat.id, msg.message_id, 60);

      console.info(msg)
      if (msg.document.file_name == "MOZE.csv" && isCsv(msg.document.mime_type)){
        await uploadMoze(tgWrapper, msg.document.file_id, msg.document.file_name);
      }else if (isMarkdown(msg["document"]["file_name"], msg.document.mime_type)){
        await uploadArticle(tgWrapper, msg.document.file_id);
      }else{
        raiseFileTypeError(msg.chat.id)
      }
    })

  const raiseFileTypeError = (chatId) => {
    bot.sendMessage(chatId, 'Not supported file type')
  }
  
  } catch (e) {
    console.error(e);
  } 
  
}

controller();
