<template>
  <dialog
    ref="dialog"
    class="zindex-modal rounded"
  >
    <form
      class="ui form"
      novalidate
      novalidatemetod="dialog"
      @submit.prevent
    >
      <div class="container d-flex flex-column justify-content-between ">
        <h4 class="my-3">
          {{ getTitle }}
        </h4>
        <div v-if="dialogProps.type === 'RemoveItem'">
          <h5>
            确定移除: {{ dialogProps.item?.todo }} 吗？
          </h5>
        </div>

        <div v-if="dialogProps.type === 'AddItem'">
          <ShowDialogInput
            :label="'姓名'"
            :name="'todo'"
            :input="getInputTodo"         
            @set-input="setInputTodo"
          />
        </div>

        <div v-if="dialogProps.type === 'EditItem-add'">
          <h5>
            给 {{ dialogProps.item?.todo }} 加
          </h5>
          <ShowDialogInput
            :label="'分数'"
            :name="'todo'"
            :input="0"         
            @set-input="setInputItem_add"
          />
        </div>

        <div v-if="dialogProps.type === 'EditItem-cost'">
          <h5>
            {{ dialogProps.item?.todo }} 将要花费：
          </h5>
          <ShowDialogInput
            :label="'分数'"
            :name="'todo'"
            :input="0"         
            @set-input="setInputItem_cost"
          />
        </div>
       
        <!-- <div v-else>
          <ShowDialogInput
            :label="'Todo'"
            :name="'todo'"
            :input="getInputTodo"         
            @set-input="setInputTodo"
          />
          <ShowDialogInput
            :label="'Score'"
            :name="'state'"
            :input="getInputState"
            @set-input="setInputState"
          />
        </div> -->
        <br>

        <div class="w-100 d-flex flex-row">
          <div
            class="px-2 mw-50 flex-grow"
            title="All fields must be filled"
          >
            <button
              class="ui btn w-100 btn-secondary"
             
              type="button"
              :disabled="getSignupButtonDisabled"
              formmethod="dialog"

              @click="onSubmitDialog"
            >
              确认
            </button>
          </div>
          <div class="px-2 mw-50">
            <button
              class="w-100 btn btn-secondary"
              type="button"
              formmethod="dialog"
              @click.prevent="onCloseDialog"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </form>
  </dialog>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from "vue";

import ShowDialogInput from "@/components/DialogForm/ShowDialogInput.vue";
// import ShowDialogSelect from "@/components/DialogForm/ShowDialogSelect.vue";

import { IDialogItem, IDialogProps } from '../../types/Dialog';
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
  name: "ShowDialog",
  components: { ShowDialogInput },
  emits: ["onClickCallback"],
  computed:
    mapGetters(['getInputTodo','getInputState','getTitle','getSignupButtonDisabled']),
  methods: {
    ...mapActions({
        setInputTodo:'setInputTodo',
        setInputState:'setInputState',
        setInputItem_add: "setInputItem_add",
        setInputItem_cost: "setInputItem_cost",
      }),
      onSubmitDialog: function () {
      const DialogProps: IDialogItem = {
        event: "Ok",
        method: this.dialogProps.type,
      };
      if (this.dialog) this.dialog.close();
      this.$emit("onClickCallback", DialogProps);
    },
    },

  setup(_, { emit }) {
    const dialog = ref<HTMLDialogElement | null>(null);
    function onCloseDialog() {
      if (dialog.value) dialog.value.close();
      const DialogProps: IDialogItem = { event: "Cancel" };
      emit("onClickCallback", DialogProps);
    }
    onMounted(() => {
      if (dialog.value) {
        dialog.value.showModal();
        //click outer modal form listener
        dialog.value.addEventListener("click", (e) => {
          const dialogDimensions = dialog.value?.getBoundingClientRect();
          if (
            dialogDimensions !== undefined &&
            (e.clientX < +dialogDimensions?.left ||
              e.clientX > +dialogDimensions?.right ||
              e.clientY < +dialogDimensions?.top ||
              e.clientY > +dialogDimensions?.bottom)
          ) {
            onCloseDialog();
          }
        });
      }
    });

    return { dialog,  onCloseDialog };
  },

  props: {
    dialogProps: {
      required: true,
      type: Object as PropType<IDialogProps>,
    },
  },
});
</script>

<style scoped></style>
