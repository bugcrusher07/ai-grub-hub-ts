import { geminiApi } from "../geminiApi";
import { ResponseObject } from "../common/common";

export interface EmailParams{
  subject:string,
  recipient:string,
  wordLimit:number,
  senderAddress:string,
  tone:string,
  customRequest?:string
}

export async function generateEmails(params:EmailParams):Promise<ResponseObject>{
  const prompt:string = `Using the following parameters, generate a professional email in JSON format. Ensure the email adheres to the specified word limit, tone, and custom request. The email should be well-structured and appropriate for the recipient.

Parameters:

Subject: ${params.subject}

Recipient: ${params.recipient}

Word Limit: ${params.wordLimit}

Sender Address: ${params.senderAddress}

Tone: ${params.tone} (e.g., formal, casual, friendly, professional)

Custom Request: ${params.customRequest}
The response should be in json format
  `
  return await geminiApi(prompt);
}
