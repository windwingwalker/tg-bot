import { Telegraf, Context } from "telegraf";
import { message } from "telegraf/filters";
import { TextMessage, DocumentMessage, TgWrapper } from "./models";
import { getParameterFromSSM, isCsv, isMarkdown } from "./functions";
import uploadArticle from "./upload-article/index";
import uploadMoze from "./upload-moze/index";
import callSanta from "./call-santa/index";

const controller = async ()  => {
  try{
    const tgToken: string = await getParameterFromSSM("/tg-bot/default-token");
    const bot: Telegraf = new Telegraf(tgToken);

    bot.help((ctx: Context) => ctx.reply('Help menu is coming soon'));

    bot.command('health', async (ctx: Context) => {
      const tgWrapper = new TgWrapper(bot, ctx["message"]["chat"]["id"], ctx["message"]["message_id"], 10);
      await tgWrapper.sendMessage('I am healthy');
      tgWrapper.deleteMessages();
    });

    bot.command('santa', async (ctx: Context) => {
      const tgWrapper = new TgWrapper(bot, ctx["message"]["chat"]["id"], ctx["message"]["message_id"], 10);
      await callSanta(tgWrapper);
    });

    bot.on(message('document'), async (ctx: Context) => {
      console.info(ctx["message"]);
      const tgWrapper = new TgWrapper(bot, ctx["message"]["chat"]["id"], ctx["message"]["message_id"], 60);

      const fileId: string = ctx["message"]["document"]["file_id"];
      const fileName: string = ctx["message"]["document"]["file_name"];
      const mime: string = ctx["message"]["document"]["mime_type"];

      if (fileName == "MOZE.csv" && isCsv(mime)) {
        await uploadMoze(tgWrapper, fileId, fileName);  
      } else if (isMarkdown(fileName, mime)) {
        await uploadArticle(tgWrapper, fileId);
      }
    });

    bot.launch();
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));

    // const raiseFileTypeError = (chatId) => {
    //   bot.sendMessage(chatId, 'Not supported file type')
    // }
  
  } catch (e) {
    console.error(e);
  }   
}

controller();
