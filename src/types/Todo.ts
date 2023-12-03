export const StatesTodo = ["New","In progress", "Done", "Paused", "Canceled"] as const;
export type StatesTodoType = (typeof StatesTodo)[number] | "";

interface ITodo {
  id: string;
  todo: string;
  state: number; // 历史总分
  currentState: number; // 当前分数
  createdAt: string;
}

export const emptyItem: ITodo = {
  id: "",
  todo: "",
  state: 0,
  currentState: 0,
  createdAt: "",
};

export default ITodo;
