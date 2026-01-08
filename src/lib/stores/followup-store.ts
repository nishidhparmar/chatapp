import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface FollowupState {
  followupQuestions: string[];
  currentChatId: number | null;
}

interface FollowupActions {
  setFollowupQuestions: (questions: string[], chatId: number) => void;
  clearFollowupQuestions: () => void;
  addFollowupQuestion: (question: string) => void;
  removeFollowupQuestion: (index: number) => void;
}

type FollowupStore = FollowupState & FollowupActions;

const initialState: FollowupState = {
  followupQuestions: [],
  currentChatId: null,
};

export const useFollowupStore = create<FollowupStore>()(
  devtools(
    (set, _get) => ({
      ...initialState,

      setFollowupQuestions: (questions, chatId) =>
        set(
          { followupQuestions: questions, currentChatId: chatId },
          false,
          'setFollowupQuestions'
        ),

      clearFollowupQuestions: () =>
        set(initialState, false, 'clearFollowupQuestions'),

      addFollowupQuestion: question =>
        set(
          state => ({
            followupQuestions: [...state.followupQuestions, question],
          }),
          false,
          'addFollowupQuestion'
        ),

      removeFollowupQuestion: index =>
        set(
          state => ({
            followupQuestions: state.followupQuestions.filter(
              (_, i) => i !== index
            ),
          }),
          false,
          'removeFollowupQuestion'
        ),
    }),
    {
      name: 'followup-store',
    }
  )
);
