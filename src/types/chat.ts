// Chart data structures from API
export interface BarChartData {
  type: 'bar_chart';
  data: Array<{
    month: string;
    value: number;
    fullMonth: string;
  }>;
}

export interface LineChartData {
  type: 'line_chart';
  data: Array<{
    date: string;
    fullDate: string;
    value: number;
  }>;
}

export interface PieChartData {
  type: 'pie_chart';
  data: Array<{
    name: string;
    value: number;
    percent: number;
  }>;
}

export interface TableData {
  type: 'table';
  data: Array<Record<string, unknown>>;
  columns: string[];
}

export type ChartContentData =
  | BarChartData
  | LineChartData
  | PieChartData
  | TableData;

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
  chart_content?: ChartContentData;
}

export interface ChatDetailMessage {
  message_id: number;
  sender: 'user' | 'assistant';
  text: string;
  sql_query: string | null;
  chart_content?: ChartContentData;
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

export interface ChatListGroup {
  group_id?: number;
  title: string;
  chats: ChatListItem[];
}

export interface ChatListData {
  groups: ChatListGroup[];
  chats: ChatListItem[];
}

export interface ChatGroup {
  group_id: number;
  name: string;
  created_at: string;
  updated_at: string;
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
  group_id: number; // Use 0 to create a new group, or existing group_id to add to existing group
  group_name: string;
}

export interface ChatGroupsData {
  groups: ChatGroup[];
}
