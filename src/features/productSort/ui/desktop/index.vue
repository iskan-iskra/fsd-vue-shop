<script setup lang="ts">
import { AppButton, AppCol, AppRow } from "shared/ui";
import { TProductSort } from "shared/api";
import { ref, watch, PropType } from "vue";

const props = defineProps({
  currentSort: {
    type: String as PropType<TProductSort>,
  },
});

const emits = defineEmits(["choose-sort"]);

const searchMethod = ref<TProductSort>();

watch(
  () => props.currentSort,
  () => {
    searchMethod.value = props.currentSort;
  }
);

const setCurrentSortMethod = (
  val: TProductSort | undefined
) => {
  if (searchMethod.value === val) {
    val = undefined;
    searchMethod.value = undefined;
  } else {
    searchMethod.value = val;
  }
  emits("choose-sort", val);
};

type TsearchMethodList = {
  key: TProductSort;
  name: string;
};

const searchMethodList = ref<TsearchMethodList[]>([
  {
    key: "byAmountUp",
    name: "Количество ↑",
  },
  {
    key: "byAmountDown",
    name: "Количество ↓",
  },
  {
    key: "byCostUp",
    name: "Цена ↑",
  },
  {
    key: "byCostDown",
    name: "Цена ↓",
  },
]);
</script>

<template>
  <AppRow
    :lg-gutter="[32, 8]"
    class="wrapper"
  >
    <AppCol
      :lg="12"
      v-for="item in searchMethodList"
      :key="item.key"
    >
      <AppButton
        size="small"
        :type="
          searchMethod === item.key
            ? 'default'
            : 'secondary'
        "
        :outlined="searchMethod === item.key ? false : true"
        @click="setCurrentSortMethod(item.key)"
      >
        {{ item.name }}
      </AppButton>
    </AppCol>
  </AppRow>
</template>

<style lang="scss" scoped>
.wrapper {
  padding: 16px 0;
}
</style>
