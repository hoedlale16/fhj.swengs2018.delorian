export interface Project {
  id?: number;
  topic: string;
  description: string;
  projectManager: string;
  totalPlannedHours: number;
  projectTimes: Array<number>;
}
