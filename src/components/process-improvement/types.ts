export type InitiativeStatus =
  | 'not started'
  | 'in progress'
  | 'on hold'
  | 'cancelled'
  | 'blocked'
  | 'completed';

export const InitiativeStatusValues = [
  'not started', 'planned',
  'in progress',
  'on hold',
  'cancelled',
  'blocked',
  'completed'] as const;

export type TaskStatus = 'not started' | 'in progress' | 'completed' | 'delayed';

export type InitiativeStatusOLD = 'planned' | 'in progress' | 'completed' | 'on hold';
export type TaskStatusOLD = 'not started' | 'in progress' | 'completed' | 'delayed';

export enum EnumInitiativeStatus {
  NotStarted = 'not started',
  InProgress = 'in progress',
  OnHold = 'on hold',
  Cacelled = 'cancelled',
  Blocked = 'blocked',
  Completed = 'completed',
}

export interface ProcessGET {
  id: string;
  process_number: string;
  process_name: string;
  process_issue: string;
  process_solution: string;
  process_benefits: string;
  process_status: InitiativeStatus;
  process_start_date: string;
  process_completion_date: string
}

export interface Task {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  deadline: string;
  weight: number;
  percentCompleted: number;
  files: TaskFile[];
}

export interface TaskFile {
  id: string;
  name: string;
  size: number;
  uploadDate: string;
  type: string;
}

export interface ProcessPOST {
  process_number: string;
  process_name: string;
  process_issue: string;
  process_solution: string;
  process_benefits: string;
  process_status: InitiativeStatus;
  process_start_date: string;
  process_completion_date: string;
}

export interface ProcessTask{
  id: string;
  process_number: string;
  process_name: string;
  process_issue: string;
  process_solution: string;
  process_benefits: string;
  process_status: InitiativeStatus;
  process_completenessRate: number;
  process_start_date: string;
  process_completion_date: string;
  process_tasks: Task[];
}

export interface InitiativeOLD {
  id: string;
  processNumber: string;
  name: string;
  issue: string;
  solution: string;
  benefits: string;
  status: InitiativeStatusOLD;
  completenessRate: number;
  startDate: string;
  completionDate: string;
  tasks: TaskOLD[];
}

export interface TaskOLD {
  id: string;
  name: string;
  description: string;
  status: TaskStatusOLD;
  deadline: string;
  weight: number;
  percentCompleted: number;
  files: TaskFile[];
}