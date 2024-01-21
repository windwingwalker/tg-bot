import { getJavaScriptObjectFromS3JSON, getS3ObjectFromJavaScriptObject, getStringFromStream } from "../../functions/index";
import { getObjectFromS3, getParameterFromSSM, putObjectToS3} from "../../functions/io"
import { TgWrapper } from "../../models";
import { Attendee } from "./models";

export const getAttendeeListFromS3 = async (): Promise<Attendee[]> => {
  const bucketName: string = await getParameterFromSSM("/tg-bot/s3-bucket-name");
  const dataInStream = await getObjectFromS3(bucketName, "santa.json");
  const attendeeList: Attendee[] = await getJavaScriptObjectFromS3JSON(dataInStream);
  return attendeeList;
}

export const putAttendeeListToS3 = async (attendeeList: Attendee[]): Promise<void> => {
  const bucketName: string = await getParameterFromSSM("/tg-bot/s3-bucket-name");
  const s3Object = await getS3ObjectFromJavaScriptObject(attendeeList);
  await putObjectToS3(bucketName, "santa.json", s3Object);
}

export const addAttendeeToList = async (name: string, wish: string, attendeeList: Attendee[], chatId: number | string): Promise<Attendee[]> => {
  attendeeList.forEach((attendee: Attendee) => {
    if (attendee["name"] == name) throw new Error("You have already registered!");
  });

  attendeeList.push({"name": name, "wish": wish, "chatId": chatId} as Attendee)
  return attendeeList;
}

export const displayAttendeeList = (attendeeList: Attendee[]): string => {
  var res: string = ""
  for (var i = 0; i < attendeeList.length; i++){
    res += `${i+1}) ${attendeeList[i]["name"]}\n`;
  }
  return res;
}

export const distributeResultToPrivateChat = async (tgWrapper: TgWrapper, attendeeList: Attendee[]) => {
  var havenPresentMapping = {}
  for (var i = 0; i < attendeeList.length; i++){
    havenPresentMapping[attendeeList[i]["name"]] = attendeeList[i]["wish"];
  }

  for (var i = 0; i < attendeeList.length; i++){
    var message = ""
    message += `You are going to prepare a haven present for ${attendeeList[i]["havenPresentTarget"]}. His/her haven present wish is "${havenPresentMapping[attendeeList[i]["havenPresentTarget"]]}"\n`
    message += `You are going to prepare a hell present for  ${attendeeList[i]["hellPresenTarget"]}.\n`
    await tgWrapper.bot.telegram.sendMessage(attendeeList[i]["chatId"], message);
  }
}

export const addSantaToAttendees = (attendeeList: Attendee[]): Attendee[] => {
  while (!santaDistributionIsValid(attendeeList)) {
    var havenSantaList: number[] = getUniqueRandomNumberList(attendeeList.length);    
    for (var i = 0; i < attendeeList.length; i++){
      attendeeList[i]["havenPresentTarget"] = attendeeList[havenSantaList[i]]["name"]
    }

    var hellSantaList: number[] = getUniqueRandomNumberList(attendeeList.length);    
    for (var i = 0; i < attendeeList.length; i++){
      attendeeList[i]["hellPresenTarget"] = attendeeList[hellSantaList[i]]["name"]
    }
  }
  return attendeeList;
}

export const santaDistributionIsValid = (attendeeList: Attendee[]): boolean => {
  for(var i = 0; i < attendeeList.length; i++){
    if (attendeeList[i]["name"] == undefined || attendeeList[i]["havenPresentTarget"] == undefined || attendeeList[i]["hellPresenTarget"] == undefined){
      return false;
    }
    if (attendeeList[i]["name"] == attendeeList[i]["havenPresentTarget"] || attendeeList[i]["name"] == attendeeList[i]["hellPresenTarget"] || attendeeList[i]["havenPresentTarget"] == attendeeList[i]["hellPresenTarget"]){
      return false;
    }
  }
  return true;
}

export const getUniqueRandomNumberList = (length: number): number[] => {
  for (var res=[],i=0;i<length;++i) res[i]=i;

  function shuffle(array) {
    var tmp, current, top = array.length;
    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
    return array;
  }

  res = shuffle(res);
  return res
}