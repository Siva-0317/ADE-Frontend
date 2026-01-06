export enum AutomationType {
  WEBSITE_MONITOR = 'website_monitor',
  PRICE_TRACKER = 'price_tracker',
  DISCORD_NOTIFIER = 'discord_notifier',
  SLACK_NOTIFIER = 'slack_notifier',
  EMAIL_DIGEST = 'email_digest',
}

export enum AutomationStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  FAILED = 'failed',
  COMPLETED = 'completed',
}

export interface Automation {
  id: string;
  name: string;
  type: AutomationType;
  status: AutomationStatus;
  config: Record<string, any>;
  workflow_code: string;
  created_at: string;
  next_run?: string;
}

export interface WorkflowNode {
  id: string;
  type: string;
  label: string;
  description: string;
}

export interface WorkflowEdge {
  source: string;
  target: string;
}

export interface WorkflowDesign {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  description: string;
  estimated_tokens: number;
}
