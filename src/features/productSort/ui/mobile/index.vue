<script setup lang="ts">
import { PropType, ref } from "vue";
import { TProductSort } from "shared/api";

import AppProductSortDesktop from "../desktop";
import { AppButton, AppCol, AppRow } from "shared/ui";
const props = defineProps({
  currentSort: {
    type: Object as PropType<TProductSort>,
  },
});
const emits = defineEmits(["choose-sort"]);
const isSortChoose = ref(false);
const switchSortChoose = () => {
  isSortChoose.value = !isSortChoose.value;
};

const chooseSort = (val: TProductSort | undefined) => {
  switchSortChoose();
  emits("choose-sort", val);
};
</script>

<template>
  <div>
    <AppRow
      :lg-gutter="[32, 8]"
      justify="center"
    >
      <AppCol :xs="8">
        <AppButton
          type="primary"
          :outlined="!isSortChoose"
          @click="switchSortChoose"
          size="small"
        >
          Выбрать сортировку
        </AppButton>
      </AppCol>
    </AppRow>
    <AppProductSortDesktop
      class="dropdown"
      :current-sort="currentSort"
      v-show="isSortChoose"
      @choose-sort="chooseSort"
    />
  </div>
</template>

<style lang="scss" scoped>
.mobile_button {
  font-size: 0.5rem;
}
.dropdown {
  position: relative;
  box-shadow: 0 12px 16px rgb(0 0 0 / 5%);

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-background);
    opacity: 0.9;
  }
}
</style>
