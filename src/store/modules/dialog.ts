import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import IDialog, { IDialogProps } from "../../types/Dialog";
import { RootStateStorable } from "./todo";
import stringGuard from "../../modules/stringGuard";
import useFormValidation from "@/modules/useFormValidation";
import useSubmitButtonState from "@/modules/useSubmitButtonState";

const { errors } = useFormValidation();

const dialogState: IDialog = {
  show: false,
  disableConfirm: false,
  inputTodo: "",
  inputState: 0,
  dialogProps: {
    type: "",
  },
};

const dialogGetters: GetterTree<IDialog, RootStateStorable> = {
  getShowState(state): boolean {
    return state.show;
  },
  getDialogProps(state): IDialogProps {
    return state.dialogProps;
  },
  getInputTodo(state): string {
    return stringGuard(state.inputTodo);
  },
  getInputState(state): number {
    return state.inputState;
  },
  getTitle(state) {
    console.log("getTitle " + state.dialogProps.type)
    if (state.dialogProps.type === "EditItem") return "Edit ToDo";
    else if (state.dialogProps.type === "AddItem") return "添加学生";
    else if (state.dialogProps.type === "EditItem-add") return "加分";
    else if (state.dialogProps.type === "EditItem-cost") return "消费";
    else if (state.dialogProps.type === "RemoveItem") return "移除学生";
    return "未知选项";
  },
  getSignupButtonDisabled(state) {
    return state.disableConfirm;
  },
};

const dialogActions: ActionTree<IDialog, RootStateStorable> = {
  setShowState(ctx, value) {
    ctx.commit(value ? "setShowTrue" : "setShowFalse");
  },
  setDialogProps(ctx, value) {
    ctx.commit("updateDialogProps", value);
    ctx.commit("setSignupButtonDisabled");
  },
  setInputTodo(ctx, value) {
    console.log("setInputTodo " + value)
    ctx.commit("updateInputTodo", value);
    ctx.commit("setSignupButtonDisabled");
  },
  setInputItem_cost(ctx, value) {
    console.log("setInputItem_cost " + value)
    ctx.commit("updateInput_cost", value);
    ctx.commit("setSignupButtonDisabled");
  },
  setInputItem_add(ctx, value) {
    console.log("setInputItem_add " + value)
    ctx.commit("updateInput_add", value);
    ctx.commit("setSignupButtonDisabled");
  },
  setInputState(ctx, value) {
    console.log("setInputState " + value);
    ctx.commit("updateInputState", value);
    ctx.commit("setSignupButtonDisabled");
  },
};
const dialogMutations: MutationTree<IDialog> = {
  setSignupButtonDisabled(state) {
    if (state.dialogProps.type === "RemoveItem") return true;
    const dialogData = {
      todo: "" + state.inputTodo,
      state: "" + state.inputState,
    };
    const { isButtonDisabled } = useSubmitButtonState(dialogData, errors);
    state.disableConfirm = isButtonDisabled();
  },
  setShowTrue(state) {
    state.show = true;
  },
  setShowFalse(state) {
    state.show = false;
  },
  updateDialogProps(state, value) {
    state.dialogProps = value;
  },
  updateInputTodo(state, value) {
    console.log("updateInputTodo " + value);
    state.inputTodo = value;
    if (state.dialogProps.item)
      state.dialogProps.item = { ...state.dialogProps.item, todo: value };
  },
  updateInput_cost(state, value) {
    console.log("updateInput_cost " + value);
    state.inputState = value;
    // if (state.dialogProps.item)
    //   state.dialogProps.item = { ...state.dialogProps.item, todo: value };
  },
  updateInput_add(state, value) {
    console.log("updateInput_add " + value);
    state.inputState = value;
    // if (state.dialogProps.item)
    //   state.dialogProps.item = { ...state.dialogProps.item, todo: value };
  },
  updateInputState(state, value) {
    console.log("updateInputState " + value);
    state.inputState = value;
    if (state.dialogProps.item) {
      // console.log("updateInputState2 " + state.dialogProps.item.state);
      state.dialogProps.item = { ...state.dialogProps.item, state: value };
    }
  },
};
const dialogStore: Module<IDialog, RootStateStorable> = {
  actions: dialogActions,
  mutations: dialogMutations,
  state: dialogState,
  getters: dialogGetters,
};
export default dialogStore;
