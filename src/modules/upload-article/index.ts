import { TgWrapper } from "../../models";
import axios, { AxiosResponse } from "axios";
import { getIdTokenFromCognito, getParameterFromSSM } from "../../functions/io";

const API_ENDPOINT_DOMAIN = "api.windwingwalker.xyz";

const uploadArticle = async (tgWrapper: TgWrapper, fileId: string): Promise<void> => {
  try{
    await tgWrapper.sendMessage("Start uploading");

    console.info("Stage 1: Get Cognito token");
    const username: string = await getParameterFromSSM("/article/api-username");
    const password: string = await getParameterFromSSM("/article/api-password");
    const cognitoClientId: string = await getParameterFromSSM("/article/cognito-client-id");
    const idToken: string = await getIdTokenFromCognito(username, password, cognitoClientId);
    const headerOptions = {headers: {'Authorization': idToken}};
    
    console.info("Stage 2: Download file from TG server");
    const articleInString: string = await tgWrapper.downloadFile(fileId);
  
    console.info("Stage 3: Put article into Dynamodb")
    var response: AxiosResponse = await axios.put(`https://${API_ENDPOINT_DOMAIN}/article/article`, articleInString, headerOptions);
    if (response["status"] != 200) throw new Error("Fail to upload article");

    await tgWrapper.sendMessage('Successfully uploaded article');
    
  } catch (e) {
    console.error(e);
    await tgWrapper.sendMessage(e);

  } finally {
    console.info("Function returns");
    tgWrapper.deleteMessages();
    
  }
}

export default uploadArticle;