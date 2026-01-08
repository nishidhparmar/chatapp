import { VisualizationType } from '../components/common/invoice-view/types';

// Chart data structures from API
export interface BarChartData {
  type: 'bar_chart';
  data: Array<{
    label: string;
    value: number;
  }>;
  min_value?: number;
  max_value?: number;
  columns?: {
    x: string;
    y: string;
  };
}

export interface LineChartData {
  type: 'line_chart';
  data: Array<{
    label: string;
    value: number;
  }>;
  min_value?: number;
  max_value?: number;
  columns?: {
    x: string;
    y: string;
  };
}

export interface PieChartData {
  type: 'pie_chart';
  data: Array<{
    label: string;
    value: number;
    percent: number;
  }>;
  min_value?: number;
  max_value?: number;
}

export interface TextData {
  type: 'text';
  data: Array<{
    count: number;
  }>;
  min_value?: number;
  max_value?: number;
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
  | TableData
  | TextData;

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
  id: number;
  sender: 'user' | 'assistant';
  text: string;
  chart_content?: ChartContentData;
  created_at: string;
  visualization_type?: VisualizationType;
  chart_type?: VisualizationType;
  title: string;
}

export interface ChatDetail {
  chat_id: number;
  title: string;
  is_saved: boolean;
  is_in_group: boolean;
  messages: ChatDetailMessage[];
  created_at: string;
  updated_at: string;
  group_id: number;
}

export interface ChatAskResponse {
  messages: ChatMessage[];
  is_saved: boolean;
  chat_id: number;
  chat_title: string;
  followup_questions: string[];
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
  search?: string;
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

// Chart data for data tab
export interface ChartDataFormat {
  data_type: string;
  label_key?: string;
  value_key?: string;
  columns?: string[];
}

export interface ChartContent {
  type: string;
  data_format: ChartDataFormat;
  raw_data: Array<Record<string, string | number>>;
}

export interface ChatChart {
  message_id: number;
  visualization_type: string;
  chart_content: ChartContent;
}

export interface ChatChartsResponse {
  status: string;
  data: ChatDetailMessage[];
  message: string;
}
