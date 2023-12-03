import ITodo from "./Todo";

type EventType = "Ok" | "Cancel";

export interface IDialogProps {
  type: string,
  item?: ITodo,
}

export interface IDialogItem {
  event: EventType;
  method?: string;
  todo?: string;
  state?: number;
  createdAt?: string;
  id?: string;
}

export default interface IDialog {
  show: boolean,
  disableConfirm:boolean,
  inputTodo?:string,
  inputState:number,
  dialogProps: IDialogProps;
}
