import { ResponseObject } from "../common/common";
import { geminiApi } from "../geminiApi";


export interface AdviceParams{
  age?:number,
  currentMentalState:string,
  advicePrompt:string,
  situationOrChallenge:string,
  context:string,
}

export async function generateAdvice(params:AdviceParams):Promise<ResponseObject>{
  const prompt:string = `I am seeking advice on [adviceRegarding], and I would like your guidance to help me navigate this situation. Heres some context about me and my current circumstances:

Age: ${params.age} (if applicable)

Current Mental State: ${params.currentMentalState} (e.g., stressed, confused, optimistic, etc.) if provided

Situation or Challenge: ${params.situationOrChallenge}

Advice Prompt: ${params.advicePrompt} (e.g., "How can I improve my decision-making?" or "What steps can I take to feel more confident?") if provided

Additional Context: ${params.context} if provided

Please provide actionable, empathetic, and thoughtful advice tailored to my situation. If applicable, include steps I can take, mindset shifts I should consider, or resources I can explore. Thank you!
The response should be in json format`
  return await geminiApi(prompt);
}