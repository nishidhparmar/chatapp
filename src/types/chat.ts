export interface ChatAskPayload {
  chat_id: number;
  text: string;
  mode: 'search' | 'conversational';
}

export interface ChatMessage {
  id: number;
  sender: 'user' | 'assistant';
  answer: string;
  viz_hint?: string;
  chart_content?: {
    type: string;
    data_format: {
      columns: string[];
      data_type: string;
    };
    raw_data: Array<Record<string, unknown>>;
  };
}

// Chart data structures from API
export interface BarChartData {
  type: 'bar_chart';
  data: {
    labels: Array<string | number>;
    values: Array<string | number>;
  };
  config: {
    x_axis: string;
    y_axis: string;
  };
}

export interface LineChartData {
  type: 'line_chart';
  data: {
    x_axis: Array<string | number>;
    y_axis: Array<string | number>;
  };
  config: {
    x_axis: string;
    y_axis: string;
  };
}

export interface PieChartData {
  type: 'pie_chart';
  data: Array<{
    label: string | number;
    value: string | number;
  }>;
  config: {
    label_column: string;
    value_column: string;
  };
}

export type ChartContentData = BarChartData | LineChartData | PieChartData;

export interface ChatDetailMessage {
  message_id: number;
  sender: 'user' | 'assistant';
  text: string;
  sql_query: string | null;
  chart_content?:
    | {
        type: string;
        raw_data: Array<Record<string, unknown>>;
        data_format: {
          columns: string[];
          data_type: string;
        };
      }
    | ChartContentData
    | null;
  created_at: string;
}

export interface ChatDetail {
  chat_id: number;
  title: string;
  is_saved: boolean;
  messages: ChatDetailMessage[];
  created_at: string;
  updated_at: string;
}

export interface ChatAskResponse {
  messages: ChatMessage[];
  is_saved: boolean;
  chat_id: number;
  chat_title: string;
}

export interface ChatListItem {
  chat_id: number;
  title: string | null;
  is_saved: boolean;
  created_at: string;
  updated_at: string;
}

export interface ChatListData {
  groups: Array<unknown>; // Based on your response, groups is empty array
  chats: ChatListItem[];
}

export interface ChatListParams {
  page?: number;
  per_page?: number;
}

export interface RenameChatPayload {
  title: string;
}

export interface ViewAsPayload {
  visualization_type: string;
}

export interface AddToGroupPayload {
  group_id: number;
  group_name: string;
}
