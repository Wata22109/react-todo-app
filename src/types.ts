export type Todo = {
  id: string;
  name: string;
  memo: string; // 追加：メモ機能
  isDone: boolean;
  priority: number;
  deadline: Date | null;
  tags: string[];
  category?: string;
};
