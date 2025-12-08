export interface CreateFeedbackPayload {
  message_id: string;
  user_id: string;
  message: string;
  sentiment: 'positive' | 'negative';
}

export interface SuggestedFeedback {
  positive: string[];
  negative: string[];
}
