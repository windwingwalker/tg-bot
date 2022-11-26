import { TgWrapper } from "../models";
import axios, { AxiosResponse } from "axios";
import { getIdTokenFromCognito, getParameterFromSSM } from "../functions";

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
    if (!articleInString) throw new Error("Fail to download file from TG official server");
    
    console.info("Stage 3: Call pharse-markdown API");
    const plainArticleResponse: AxiosResponse = await axios.post(`https://${API_ENDPOINT_DOMAIN}/article/markdown`, articleInString);
    if (plainArticleResponse["status"] != 200) throw new Error(`plainArticleResponse status code is ${plainArticleResponse["status"]}`);
    
    const plainArticle: any = plainArticleResponse["data"]
    var uploadResponse: AxiosResponse;
    if (plainArticle["firstPublished"] == null){
      console.info("Stage 4: Call create-article API");
      uploadResponse = await axios.post(`https://${API_ENDPOINT_DOMAIN}/article/article`, plainArticle, headerOptions);
    }else{
      console.info("Stage 4: Call update-article API");
      uploadResponse = await axios.put(`https://${API_ENDPOINT_DOMAIN}/article/article?id=${plainArticle["firstPublished"]}`, plainArticle, headerOptions);
    }
    if (uploadResponse["status"] != 200) throw new Error("Fail to upload article");

    await tgWrapper.sendMessage('Successfully uploaded article');
    
  } catch (e) {
    console.error(e);
    await tgWrapper.sendMessage(`Error: ${e}`);
  } finally {
    console.info("Function returns");
    tgWrapper.deleteMessages();
  }
}

export default uploadArticle;