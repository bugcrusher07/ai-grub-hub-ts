import { TherapyParams,TherapyPlan } from './therapyParams';
import { geminiApi } from '../geminiApi';
import { ResponseObject } from '../common/common';

export async function generateTherapyPlan(params: TherapyParams): Promise<ResponseObject> {
  console.log("Therapy plan generation executed");

  const prompt = `You are an experienced, compassionate mental health professional. Generate a detailed, personalized therapy plan in JSON format based on the following client information:

Client Profile:
- Name: ${params.name || 'Not provided'}
- Age: ${params.age || 'Not provided'}
- Primary Concern: ${params.primaryConcern}
- Emotional State: ${params.emotionalState}
- Stress Level: ${params.stressLevel}/5
- Session Type Preferred: ${params.sessionType || 'Not specified'}
- Communication Style Preferred: ${params.communicationStyle || 'Not specified'}

Key Issues:
${params.lifeAreas.length > 0 ? `- Affected Life Areas: ${params.lifeAreas.join(', ')}\n` : ''}
${params.symptoms.length > 0 ? `- Current Symptoms: ${params.symptoms.join(', ')}\n` : ''}
${params.triggerSituations ? `- Trigger Situations: ${params.triggerSituations}\n` : ''}

Strengths and Resources:
${params.copingMechanisms ? `- Existing Coping Mechanisms: ${params.copingMechanisms}\n` : ''}
${params.supportSystem ? `- Support System: ${params.supportSystem}\n` : ''}
${params.previousTherapy ? `- Previous Therapy Experience: ${params.previousTherapy}\n` : ''}

Goals:
${params.goals ? `- Client Goals: ${params.goals}\n` : ''}
${params.timeframe ? `- Timeframe: ${params.timeframe}\n` : ''}

Additional Context:
${params.additionalContext || 'None provided'}

Generate a comprehensive therapy plan with the following structure in JSON format:

{
  "title": "Creative title reflecting the client's needs",
  "summary": "2-3 sentence overview of the plan",
  "metadata": {
    "clientName": "Name if provided",
    "age": "Age if provided",
    "primaryConcern": "Primary concern",
    "sessionType": "Preferred session type",
    "timeframe": "Suggested timeframe",
    "generatedAt": "Current ISO timestamp"
  },
  "urgencyLevel": "low/medium/high based on assessment",
  "sections": [
    {
      "type": "assessment",
      "title": "Current Assessment",
      "content": {
        "primaryConcern": "Detailed description",
        "emotionalState": "Detailed analysis",
        "stressLevel": "Analysis of stress level",
        "affectedAreas": ["list of affected areas"],
        "symptoms": ["list of symptoms"],
        "insights": ["3-5 key psychological insights"]
      }
    },
    {
      "type": "coping",
      "title": "Coping Strategies",
      "content": [
        {
          "technique": "Technique name",
          "description": "Detailed description",
          "steps": ["step 1", "step 2", "step 3"],
          "whenToUse": "When this technique is most helpful"
        }
      ]
    },
    {
      "type": "recommendations",
      "title": "Personalized Recommendations",
      "content": {
        "daily": ["3-5 daily practices"],
        "weekly": ["3-5 weekly goals"],
        "lifestyle": ["3-5 broader lifestyle suggestions"]
      }
    },
    {
      "type": "cognitive",
      "title": "Cognitive Exercises",
      "content": [
        {
          "situation": "Common triggering situation",
          "unhelpfulThought": "Example of negative thought",
          "reframe": "Healthier thought alternative",
          "technique": "Cognitive technique used"
        }
      ]
    },
    {
      "type": "selfcare",
      "title": "Self-Care Plan",
      "content": {
        "physical": ["3-5 physical self-care items"],
        "emotional": ["3-5 emotional self-care items"],
        "social": ["3-5 social self-care items"],
        "spiritual": ["3-5 spiritual self-care items"]
      }
    },
    {
      "type": "crisis",
      "title": "Crisis Management",
      "content": {
        "warningSignsToWatch": ["list of warning signs"],
        "immediateActions": ["action 1", "action 2"],
        "safetyPlan": ["step 1", "step 2", "step 3"]
      }
    }
  ],
  "resources": {
    "apps": [
      {
        "name": "App name",
        "purpose": "How it helps"
      }
    ],
    "books": [
      {
        "title": "Book title",
        "author": "Author name"
      }
    ],
    "hotlines": [
      {
        "name": "Service name",
        "number": "Contact info",
        "available": "Availability"
      }
    ]
  }
}

Important Notes:
1. Maintain a compassionate, non-judgmental tone throughout
2. Tailor all suggestions to the client's specific needs
3. Include evidence-based techniques (CBT, DBT, mindfulness, etc.)
4. For crisis content, always include national hotline information
5. Format all responses as valid JSON that can be parsed`;

  const response = await geminiApi(prompt);

  // Add additional processing if needed
      console.log(response);
  if (response.success) {
    try {
      // const plan = JSON.parse(response);
      // console.log(plan);
      // const plan = response.content;
      // const plan = response.content;
      return response;
      // return {
      //   ...plan,
      //   metadata: {
      //     ...plan.metadata,
      //     generatedAt: new Date().toISOString()
      //   }
      // };
      console.log("changes to test if railway is working")
    } catch (e) {
      console.error("Error parsing therapy plan:", e);
      throw new Error("Failed to parse therapy plan");
    }
  } else {
    throw new Error(response.error || "Failed to generate therapy plan");
  }
}