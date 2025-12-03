export interface QuestionSection {
  title: string;
  questions: string[];
  count: number;
}

export interface SuggestedQuestionsResponse {
  recent_questions: QuestionSection;
  role_based_questions: QuestionSection;
}
