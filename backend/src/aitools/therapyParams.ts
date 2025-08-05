export interface TherapyParams {
  name?: string;
  age?: string;
  primaryConcern: string;
  emotionalState: string;
  stressLevel: string;
  sleepQuality: string;
  supportSystem: string;
  previousTherapy?: string;
  triggerSituations?: string;
  copingMechanisms?: string;
  goals?: string;
  timeframe: string;
  sessionType?: string;
  communicationStyle: string;
  lifeAreas: string[];
  symptoms: string[];
  frequency: string;
  intensity: string;
  additionalContext?: string;
}

export interface TherapyPlan {
  title: string;
  summary: string;
  metadata: {
    clientName: string;
    age: string;
    primaryConcern: string;
    sessionType: string;
    timeframe: string;
    generatedAt: string;
  };
  urgencyLevel: 'low' | 'medium' | 'high';
  sections: {
    type: 'assessment' | 'coping' | 'recommendations' | 'cognitive' | 'selfcare' | 'crisis' | 'tracking';
    title: string;
    content: any;
  }[];
  resources: {
    apps: { name: string; purpose: string }[];
    books: { title: string; author: string }[];
    hotlines: { name: string; number: string; available: string }[];
  };
}