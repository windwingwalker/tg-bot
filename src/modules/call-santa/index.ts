import { TgWrapper } from "../../models";
import { Composer, Markup, Scenes, session, Telegraf } from "telegraf";
import { description, steps,  inlineMessageKeyboard, Attendee} from "./models";
import { addAttendeeToList, addSantaToAttendees, displayAttendeeList, distributeResultToPrivateChat, getAttendeeListFromS3, putAttendeeListToS3 as putRegisterationData } from "./functions";

const callSanta = async (tgWrapper: TgWrapper): Promise<void> => {
  try{
    // const stage = new Scenes.Stage<Scenes.WizardContext>([settings], {
    //   default: "settins",
    // });

    const regiserationWizard = new Scenes.WizardScene(
      "REGISTERATIOM_WIZARD",
      async (ctx: Scenes.WizardContext) => {
        await ctx.reply("You are going to register, please enter your name. For example, if you are 'Chris Wong', you should type:\n/name Chris Wong");
        return ctx.wizard.next();
      },
      // stepHandler,
      async (ctx: Scenes.WizardContext) => {    
        ctx.wizard.state["name"] = ctx.message["text"].split(" ").slice(1).join(" ")
        await ctx.reply("Please enter your wish in one single reply. For example, if you want 'A robot. It should be able to fly.' , you should type:\n/wish A robot. It should be able to fly.");
        return ctx.wizard.next();
      },
      async (ctx: Scenes.WizardContext) => {
        ctx.wizard.state["wish"] = ctx.message["text"].split(" ").slice(1).join(" ")
        await ctx.reply(`Your name is ${ctx.wizard.state["name"]}`)
        await ctx.reply(`Your wish is "${ctx.wizard.state["wish"]}"`)
        await ctx.reply(`You have finished the registeration. Bye.`)
        const attendeeList: Attendee[] = await await getAttendeeListFromS3();
        const newAttendeeList: Attendee[] = await addAttendeeToList(ctx.wizard.state["name"], ctx.wizard.state["wish"], attendeeList, ctx.chat.id)
        await putRegisterationData(newAttendeeList);
        return ctx.scene.leave();
      },
    );

    await tgWrapper["bot"]["telegram"].sendMessage(tgWrapper.chatId, description, inlineMessageKeyboard);

    const stage = new Scenes.Stage<any>([regiserationWizard]);
    tgWrapper.bot.use(session());
    tgWrapper.bot.use(stage.middleware());

    await tgWrapper["bot"].action("REGISTER", (ctx) => {
      ctx["scene"].enter("REGISTERATIOM_WIZARD")
    })

    await tgWrapper["bot"].action("CHECK_ATTENDEE_LIST", async (ctx) => {
      ctx.reply("started checking attendee list");
      const attendeeList: Attendee[] = await getAttendeeListFromS3();

      if (attendeeList.length == 0) {
        ctx.reply("attendee list is empty");
      } else {
        ctx.reply(`attendee list is the following:\n${displayAttendeeList(attendeeList)}`);
      }
    })

    await tgWrapper["bot"].action("START_PRESENT_DRAW", async (ctx) => {
      await ctx.reply("started the present draw");
      var attendeeList: Attendee[] = await getAttendeeListFromS3();
      attendeeList = addSantaToAttendees(attendeeList);
      await distributeResultToPrivateChat(tgWrapper, attendeeList);
      ctx.reply("finished the present draw");
    })

    await tgWrapper["bot"].action("CLEAR_ATTENDEE_LIST", async (ctx) => {
      ctx.reply("started clearing attendee list");
      await putRegisterationData([]);
      ctx.reply("finished clearing");
    })

  } catch (e) {
    await tgWrapper.sendMessage(e);
    console.error(e);
    
  } finally {
    console.info("Function returns");
  }
}

export default callSanta;