import { getParameterFromSSM, putObjectToS3 } from "../functions";
import { TgWrapper } from "../models";

const uploadMoze = async (tgWrapper: TgWrapper, fileId: string, fileName: string): Promise<void> => {
  try{
    await tgWrapper.sendMessage(`Start uploading ${fileName}`);

    const file: any = await tgWrapper.downloadFile(fileId);
    const bucketName: string = await getParameterFromSSM("/finance/s3-bucket-name");
    await putObjectToS3(bucketName, "moze/MOZE.csv", file);

    await tgWrapper.sendMessage('Successfully uploaded MOZE.csv');  
    
  } catch (e) {
    console.error(e);
    await tgWrapper.sendMessage(`Error: ${e}`);
  } finally {
    console.info("Function returns");
    tgWrapper.deleteMessages();
  }
}

export default uploadMoze;