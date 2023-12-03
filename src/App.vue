<template>
  <div class="container-fluid vh-100 w-100 d-flex flex-column">
    <HeadContainer @onClickGo="onClickMenuButton" />

    <div class="container w-100 flex-shrink-0">
      <TodoHat :order="getOrder" @handleSorting="handleSorting" />
    </div>

    <LoaderGif v-if="getLoading" />

    <ErrorBlock v-if="getIsError" :text="getError" />

    <TodoTable v-else :todos="getTodos" :order="getOrder" :scrolling="getScroll" />

    <ShowDialog v-if="getShowState" @onClickCallback="onDialogChoice" :dialog-props="getDialogProps" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from 'vuex';

import HeadContainer from "@/components/VisitTable/HeadButtonsContainer.vue";
import ErrorBlock from "@/components/ErrorBlock.vue";
import LoaderGif from "@/components/LoaderGif.vue";
import ShowDialog from "@/components/DialogForm/ShowDialog.vue";
import TodoHat from "@/components/TodoTable/TodoHat.vue";
import TodoTable from '@/components/TodoTable/TodoTable.vue';
import { IDialogItem, IDialogProps } from "@/types/Dialog";
import stringGuard from "@/modules/stringGuard";
import ITodo, { emptyItem } from './types/Todo';


export default defineComponent({
  name: "App",
  components: {
    HeadContainer,
    ErrorBlock,
    LoaderGif,
    ShowDialog,
    TodoHat,
    TodoTable,
  },
  computed:
    mapGetters(['getTodos', 'getLoading', 'getOrder', 'getCurrentId', 'getShowState', 'getDialogProps', 'getScroll', 'getIsError', 'getError', 'getInputTodo', 'getInputState'])
  ,
  methods: {
    ...mapActions({
      fetchData: 'fetchData',
      handleSorting: 'handleSorting',
      autoSelectCurrentItem: "autoSelectCurrentItem",
      addItem: "addItem",
      editItem: "editItem",
      editItem_add: "editItem_add",
      editItem_cost: "editItem_cost",
      deleteItem: "deleteItem",
      setShowState: 'setShowState',
      setDialogProps: 'setDialogProps',
      setInputTodo: "setInputTodo",
      setInputItem_add: "setInputItem_add",
      setInputItem_cost: "setInputItem_cost",
      setInputState: "setInputState",
      setError: 'setError'
    }),
    //wrapper will be need if we want in future use real api to catch errors
    async CallerWrapper(props?: IDialogItem) {
      try {
        if (props?.method === "RemoveItem") {
          this.deleteItem(this.getCurrentId);
          return;
        }
        if (props) {
          const body: ITodo = {
            todo: stringGuard(this.getInputTodo),
            state: this.getInputState,
            currentState: 0,
            id: stringGuard(props?.id),
            createdAt: "",
          };
          if (props?.method === "AddItem") {
            this.addItem(body);
            return;
          } else if (props?.method === "EditItem-add") {
            body.id = this.getCurrentId;
            console.log("CallerWrapper 1 + " + body.id)
            console.log("CallerWrapper 1 + " + body.todo)
            console.log("CallerWrapper 1 + " + body.state)
            console.log("CallerWrapper 1 + " + body.currentState)
            this.editItem_add(body);
            return;
          } else if (props?.method === "EditItem-cost") {
            body.id = this.getCurrentId;
            this.editItem_cost(body);
            return;
          }
        }
        console.log(props?.method)
        this.setError({ show: true, message: "unexpected action" })
      } catch (error) {
        this.setError({ show: true, message: "unexpected error" })
      }
    },

    //Dialog ok cancel event
    onDialogChoice: async function (props: IDialogItem) {
      console.log("onDialogChoice " + props)
      if (props.event === "Ok")
        await this.CallerWrapper(props);
      this.setShowState(false);
    },

    //initial dialog modal form
    onClickMenuButton: function (type: string) {
      console.log("onClickMenuButton " + type);
      const props: IDialogProps = { type: type };
      if (type !== "AddItem") {
        const currentItem = this.getTodos.find(({ id }: ITodo) => id === this.getCurrentId);
        if (currentItem) {
          props.item = { ...currentItem };
          this.setInputTodo(currentItem.todo);
          this.setInputState(0);
        }
      } else {
        props.item = { ...emptyItem };
        this.setInputTodo(emptyItem.todo);
        this.setInputState(emptyItem.state);
      }
      this.setDialogProps(props);
      this.setShowState(true);
    },

  },
  mounted() {
    this.fetchData();
    this.handleSorting(this.getOrder.order);
    this.autoSelectCurrentItem();
  },
});
</script>

<style>
body {
  height: 100vh;
}

::-webkit-scrollbar {
  width: 8px;
  border: 1px solid #d5d5d5;
}
</style>
