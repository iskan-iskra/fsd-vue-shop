<script setup lang="ts">
import { TCategory } from "shared/api";
import { useCategory } from "enitites/category";
import { AppButton, AppCol, AppRow } from "shared/ui";
import { PropType, ref, watch } from "vue";

// ----------------------
const props = defineProps({
  currentCategory: {
    type: Object as PropType<TCategory>,
  },
});

const emits = defineEmits(["choose-category"]);

const { categoryList } = useCategory();

// ---------------------
const chosenCategory = ref<TCategory | undefined>();

watch(
  () => props.currentCategory,
  () => {
    chosenCategory.value = props.currentCategory;
  }
);

const chooseCategory = (val: TCategory | undefined) => {
  if (
    val?.id === chosenCategory.value?.id ||
    (!val && !chosenCategory.value)
  ) {
    return;
  }
  chosenCategory.value = val;
  emits("choose-category", val);
};
</script>
<template>
  <AppRow
    :lg-gutter="[32, 8]"
    class="wrapper"
  >
    <AppCol :lg="12">
      <AppButton
        :type="!chosenCategory ? 'default' : 'secondary'"
        :outlined="!chosenCategory ? false : true"
        @click="chooseCategory(undefined)"
        size="small"
      >
        Все
      </AppButton>
    </AppCol>
    <AppCol
      :lg="12"
      v-for="category in categoryList"
      :key="category.id"
    >
      <AppButton
        class="button"
        :type="
          chosenCategory?.id === category.id
            ? 'default'
            : 'secondary'
        "
        :outlined="
          chosenCategory?.id === category.id ? false : true
        "
        size="small"
        @click="chooseCategory(category)"
      >
        {{ category.name }}
      </AppButton>
    </AppCol>
  </AppRow>
</template>
<style lang="scss" scoped>
.wrapper {
  padding-top: 16px;
  padding-bottom: 16px;
}
.button {
  text-transform: capitalize;
}
</style>
