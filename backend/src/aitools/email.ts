import { geminiApi } from "../geminiApi";
import { ResponseObject } from "../common/common";


export interface EmailParams{
  emailType: string;
  tone: string;
  recipient: string;
  subject: string;
  mainPurpose: string;
  keyPoints: string;
  length: string;
  context: string;
  callToAction: string;
}

export async function generateEmails(params: EmailParams): Promise<ResponseObject>{
  const prompt: string = `Using the following parameters, generate a professional email in JSON format. Ensure the email adheres to the specified length, tone, and requirements. The email should be well-structured and appropriate for the recipient.

Parameters:

Email Type: ${params.emailType}

Subject: ${params.subject}

Recipient: ${params.recipient}

Tone: ${params.tone} (e.g., formal, casual, friendly, professional)

Main Purpose: ${params.mainPurpose}

Key Points: ${params.keyPoints}

Length: ${params.length}

Context: ${params.context}

Call to Action: ${params.callToAction}

The response should be in JSON format with the following structure:
{
  "subject": "email subject line",
  "body": "email body content",
  "greeting": "appropriate greeting",
  "closing": "appropriate closing"
}
  `;

  return await geminiApi(prompt);
}