<template>
  <div class="container flex bg-white flex-shrink-0 ">
    <div class="row my-3 mx-auto">
      <HeadButton
        :icon="'AddItem'"
        @onClickButton="onClick"
        :title="'新增学生'"
        :action="'AddItem'"
      />
      <HeadButton
        :icon="'RemoveItem'"
        @onClickButton="onClick"
        :title="'移除学生'"
        :action="'RemoveItem'"
      />
      <HeadButton
        :icon="'EditItem'"
        @onClickButton="onClick"
        :title="'加分'"
        :action="'EditItem-add'"
      />
      <HeadButton
        :icon="'EditItem'"
        @onClickButton="onClick"
        :title="'消费'"
        :action="'EditItem-cost'"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import HeadButton from "@/components/VisitTable/HeadButton.vue";

export default defineComponent({
  components: {
    HeadButton,
  },
  emits: ["onClickGo"],

  methods: {
    onClick: function (type: string) {
      this.$emit("onClickGo", type);
    },
  },
});
</script>

<style scoped></style>
