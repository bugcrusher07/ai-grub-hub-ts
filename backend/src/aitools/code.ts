import { ResponseObject } from "../common/common";
import { geminiApi } from "../geminiApi";

export interface CodeParams{
  language:string,
  problemDescription:string,
  codeContext:string,
  desiredOutput:string,
  errorMessages:string,
  frameworks:string,
  timeComplexity:string,
  spaceComplexity:string,
  codeStyle:string,
  additionalConstraints:string,
}

export async function generateCode(params:CodeParams):Promise<ResponseObject>{
  const prompt:string=`You are an expert code-solving AI. Your task is to generate an optimized, well-structured, and functional code solution based on the following user inputs:

1. **Programming Language**: ${params.language}
2. **Problem Description**: ${params.problemDescription}
3. **Code Context**: ${params.codeContext}
4. **Desired Output**: ${params.desiredOutput}
5. **Error Messages**: ${params.errorMessages}
6. **Preferred Libraries/Frameworks**: ${params.frameworks}
7. **Time Complexity**: ${params.timeComplexity}
8. **Space Complexity**: ${params.spaceComplexity}
9. **Code Style**: ${params.codeStyle}
10. **Additional Constraints**: ${params.additionalConstraints}

### Instructions:
- Analyze the problem description and code context thoroughly.
- If error messages are provided, debug the code and fix the issues.
- Use the preferred libraries/frameworks if specified.
- Ensure the solution meets the desired time and space complexity requirements.
- Follow the preferred code style (e.g., functional, object-oriented, procedural).
- Adhere to any additional constraints provided by the user.
- Include comments in the code to explain key steps and logic.
- Return the solution in the following JSON format:

"json
{
  "solution": "The generated code solution as a string",
  "explanation": "A brief explanation of the solution and how it works",
  "timeComplexity": "Time complexity of the solution",
  "spaceComplexity": "Space complexity of the solution",
  "librariesUsed": "List of libraries/frameworks used in the solution"
}`


  return geminiApi(prompt);
}