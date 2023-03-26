<script setup lang="ts">
import { PropType, ref } from "vue";
import { TCategory } from "shared/api";

import AppProductCategoryDesktop from "../desktop";
import { AppButton, AppCol, AppRow } from "shared/ui";
const props = defineProps({
  currentCategory: {
    type: Object as PropType<TCategory>,
  },
});
const emits = defineEmits(["choose-category"]);
const isCategoryChoose = ref(false);
const switchCategoryChoose = () => {
  isCategoryChoose.value = !isCategoryChoose.value;
};

const chooseCategory = (val: TCategory | undefined) => {
  switchCategoryChoose();
  emits("choose-category", val);
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
          :outlined="!isCategoryChoose"
          @click="switchCategoryChoose"
          size="small"
          >Выбрать категорию</AppButton
        >
      </AppCol>
    </AppRow>
    <AppProductCategoryDesktop
      class="dropdown"
      :current-category="currentCategory"
      v-show="isCategoryChoose"
      @choose-category="chooseCategory"
    />
  </div>
</template>

<style lang="scss" scoped>
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
