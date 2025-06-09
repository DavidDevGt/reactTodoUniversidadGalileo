export interface Goal {
  id: number;
  title: string;
  description: string;
  targetDate: string; // ISO date string
  completed: boolean;
  createdAt: string; // ISO date string
}
