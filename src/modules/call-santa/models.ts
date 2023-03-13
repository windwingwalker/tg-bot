import { Telegraf, Telegram, Markup, Scenes, Composer } from "telegraf";

export interface Attendee{
  name: string;
  wish: string;
  chatId: string | number;
  havenPresentTarget?: string;
  hellPresenTarget?: string;
}

export const steps: string[] = [
  "1) Each person starts a private chat with me. Don't do it in group chat!!!\n",
  "2) You type '/santa' in private chat.\n",
  "3) You will see the same reply as this.\n",
  "4) You click 'register' button.\n",
  "5) You will be asked to enter your name, please do it.\n",
  "6) You will be asked to enter your expected haven present, please do it. Please type your haven present in one single reply.\n",
  "7) Then you are successfully registered. You just need to wait other people.\n\n",
  "8) When all people claims registered, MC can click 'check registration list' to verify if all people submitted, also anyone can click it in either group or private chat.\n",
  "9) If no problem, MC can click 'start the present draw' button.\n",
  "10) Each person can see your haven present target, hell present target and haven present wish.\n",
  "11) Buy presents!\n"
];

export const description: string = `Welcome to Santa bot. I am here to help distributing presents! Please follow the steps below.\n\n${steps.join("")}`

export const inlineMessageKeyboard = Markup.inlineKeyboard([
  Markup.button.callback("register (must click in private chat)", "REGISTER"),
  Markup.button.callback("check attendee list", "CHECK_ATTENDEE_LIST"),
  Markup.button.callback("start present draw (only MC click it)", "START_PRESENT_DRAW"),
  Markup.button.callback("clear attendee list (only MC click it)", "CLEAR_ATTENDEE_LIST"),
],{ columns: 1 });

const stepHandler = new Composer<Scenes.WizardContext>();
stepHandler.command("next2", async ctx => {
  await ctx.reply("Go to next stage");
  return ctx.wizard.next();
});
// stepHandler.on('text', async ctx => {
//   await ctx.reply("Go to next stage");
//   console.log(ctx.message.text)
//   return ctx.wizard.next();
// });