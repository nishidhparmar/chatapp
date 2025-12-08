import { ChatDetailMessage } from '../../../types/chat';

// Valid visualization types matching API payload
export type VisualizationType =
  | 'table'
  | 'bar_chart'
  | 'line_chart'
  | 'pie_chart'
  | 'stacked_chart'
  | 'grouped_chart'
  | 'multi_line';

export interface InvoiceViewProps {
  defaultView?: VisualizationType;
  title?: string;
  hideViewAs?: boolean;
  HideAddToDashboard?: boolean;
  showDelete?: boolean;
  hideExtentView?: boolean;
  data?: ChatDetailMessage;
  chatId?: number;
  onOpenDashboardView?: (dashboardId: number) => void;
  dashboardId?: number;
  chartId?: number;
}

export interface MenuItemProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export interface ViewAsMenuItem extends MenuItemProps {
  value: VisualizationType;
}
