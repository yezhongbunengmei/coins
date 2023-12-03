<template>
  <div class="row   text-white font-weight-bold text-center ">
    <TableHatCell
      :order="order"
      :title="'姓名'"
      :name="'todo'"
      @handleSorting="handleSorting"
    />
    <TableHatCell
      :order="order"
      :title="'总分'"
      :name="'state'"
      @handleSorting="handleSorting"
    />
    <TableHatCell
      :order="order"
      :title="'余额'"
      :name="'currentSatte'"
      @handleSorting="handleSorting"
    />
    <!-- <TableHatCell
      :order="order"
      :title="'Date'"
      :name="'createdAt'"
      @handleSorting="handleSorting"
    /> -->
  </div>
</template>
  
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IOrder } from '../../types/OrderBy';
import TableHatCell from './TodoHatCell.vue';

export default defineComponent({
    name: "TodoHat",
    components: {
        TableHatCell,
    },
    props: {
        order: {
            required: true,
            type: Object as PropType<IOrder>,
        },
    },
    emits: ["handleSorting"],

    methods: {
        handleSorting: function (type: string) {
            this.$emit("handleSorting", type);
        },
    },
});
</script>
  
<style scoped></style>
  