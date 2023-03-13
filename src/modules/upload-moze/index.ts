import { getParameterFromSSM, putObjectToS3 } from "../../functions/io";
import { TgWrapper } from "../../models";

const uploadMoze = async (tgWrapper: TgWrapper, fileId: string, fileName: string): Promise<void> => {
  try{
    await tgWrapper.sendMessage(`Start uploading ${fileName}`);

    const file: any = await tgWrapper.downloadFile(fileId);
    const bucketName: string = await getParameterFromSSM("/finance/s3-bucket-name");
    await putObjectToS3(bucketName, "finance/MOZE.csv", file);

    await tgWrapper.sendMessage('Successfully uploaded MOZE.csv');  
    
  } catch (e) {
    await tgWrapper.sendMessage(e);
    console.error(e);

  } finally {
    tgWrapper.deleteMessages();
    console.info("Function returns");
    
  }
}

export default uploadMoze;