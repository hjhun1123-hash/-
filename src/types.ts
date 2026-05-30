export interface HistoricalSource {
  title: string;
  year: number;
  origin: "KOREA" | "JAPAN";
  keyQuote: string;
  description: string;
  significance: string;
}

export interface InteractiveMapPoint {
  name: string;
  distance: string;
  coords: { x: number; y: number };
  visible: boolean;
  desc: string;
}

export interface FeedbackResult {
  score: number;
  historicalFactCheck: string;
  objectivityAndPerspective: string;
  strengths: string;
  improvements: string;
  evaluationComments: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}
