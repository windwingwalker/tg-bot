import { SSMClient, GetParameterCommand, GetParameterCommandInput, GetParameterCommandOutput } from "@aws-sdk/client-ssm";
import { CognitoIdentityProviderClient, InitiateAuthCommand, InitiateAuthCommandInput, InitiateAuthCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import { S3Client, PutObjectCommand, PutObjectCommandInput, PutObjectCommandOutput, GetObjectCommand , GetObjectCommandInput, GetObjectCommandOutput } from "@aws-sdk/client-s3";

export const getParameterFromSSM = async (ssmPath: string): Promise<string> => {
  const client: SSMClient = new SSMClient({ region: "us-east-1" });
  const params: GetParameterCommandInput = {Name: ssmPath};
  const command: GetParameterCommand = new GetParameterCommand(params);
  const response: GetParameterCommandOutput = await client.send(command);

  if (response["$metadata"]["httpStatusCode"] != 200) throw new Error(`SSM response status code is ${response["$metadata"]["httpStatusCode"]}`);
  if (response["Parameter"] == null) throw new Error(`SSM parameter path ${ssmPath} not found`);

  return response["Parameter"]["Value"];
}

export const getIdTokenFromCognito = async (username: string, password: string, clientId: string): Promise<string> => {
  const client: CognitoIdentityProviderClient = new CognitoIdentityProviderClient({ region: "us-east-1" });
  const params: InitiateAuthCommandInput = {AuthParameters: { "USERNAME": username, "PASSWORD": password}, AuthFlow: "USER_PASSWORD_AUTH", ClientId: clientId};
  const command: InitiateAuthCommand = new InitiateAuthCommand(params);
  const response: InitiateAuthCommandOutput = await client.send(command);

  if (response["$metadata"]["httpStatusCode"] != 200) throw new Error(`Cognito response status code is ${response["$metadata"]["httpStatusCode"]}`);
  
  return response["AuthenticationResult"]!["IdToken"] as string;
}

export const putObjectToS3 = async (bucketName: string, objectKey: string, objectValue: any): Promise<void> => {
  const client: S3Client = new S3Client({ region: "us-east-1" });
  const params: PutObjectCommandInput = {Bucket: bucketName, Key: objectKey, Body: objectValue};
  const command: PutObjectCommand = new PutObjectCommand(params);
  const response: PutObjectCommandOutput = await client.send(command);

  if (response["$metadata"]["httpStatusCode"] != 200) throw new Error(`S3 response status code is ${response["$metadata"]["httpStatusCode"]}`);
}

export const getObjectFromS3 = async (bucketName: string, objectKey: string): Promise<any | Blob | ReadableStream> => {
  const client: S3Client = new S3Client({ region: "us-east-1" });
  const params: GetObjectCommandInput = {Bucket: bucketName, Key: objectKey};
  const command: GetObjectCommand = new GetObjectCommand(params);
  const response: GetObjectCommandOutput = await client.send(command);

  if (response["$metadata"]["httpStatusCode"] != 200) throw new Error(`S3 response status code is ${response["$metadata"]["httpStatusCode"]}`);
  return response.Body;
}