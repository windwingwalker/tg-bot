export const isCsv = (mime: string): boolean => {
  return mime == "text/csv" || mime == "text/comma-separated-values";
}

export const isMarkdown = (fileName: string, mime: string): boolean => {
  return mime == "text/markdown" || fileName.endsWith(".md");
}

export const getJavaScriptObjectFromS3JSON = async (s3Object: any | Blob | ReadableStream): Promise<any | object | object[]> => {
  const dataInString = await getStringFromStream(s3Object);
  const dataInObject: any | object | object[] = await JSON.parse(dataInString);
  return dataInObject;
}

export const getS3ObjectFromJavaScriptObject = async (data: any | object): Promise<any | Blob | ReadableStream> => {
  return Buffer.from(JSON.stringify(data));
}

export const getStringFromStream = async (stream): Promise<string> => {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  })
}
