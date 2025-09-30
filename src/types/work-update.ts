export interface WorkUpdate {
  slug: string;
  title: string;
  week: string;
  project: 'MarkUs' | 'PythonTA';
  summary: string;
  date?: string;
  content?: string;
}
