export interface AddToDashboardPayload {
  chart_title: string;
  dashboard_id: number;
  dashboard_name: string;
  chart_type:
    | 'bar_chart'
    | 'line_chart'
    | 'pie_chart'
    | 'table'
    | 'area_chart'
    | 'scatter_plot';
}

export interface Dashboard {
  id: number;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DashboardChart {
  id: number;
  dashboard_id: number;
  chat_id: number;
  message_id: number;
  chart_title: string;
  chart_type: string;
  position_x?: number;
  position_y?: number;
  width?: number;
  height?: number;
  created_at: string;
  updated_at: string;
}

export interface DashboardListItem {
  dashboard_id: number;
  user_id: number;
  client_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ChartConfig {
  type: string;
  data: {
    labels: string[];
    values: number[];
  };
}

export interface DashboardWidget {
  widget_id: number;
  dashboard_id: number;
  chat_id: number;
  message_id: number;
  title: string;
  chart_type: string;
  chart_config: ChartConfig;
}

export interface DashboardDetail {
  dashboard_id: number;
  user_id: number;
  client_id: number;
  name: string;
  charts: DashboardWidget[];
}
