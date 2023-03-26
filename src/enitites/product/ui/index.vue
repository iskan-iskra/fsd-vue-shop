<script setup lang="ts">
import { AppCol, AppRow } from "shared/ui";
import { TProduct } from "shared/api";
import { PropType } from "vue";
import { useCategory } from "shared/lib";

const { getCategoryById } = useCategory();

const props = defineProps({
  data: {
    type: Object as PropType<TProduct>,
  },
});
</script>
<template>
  <div class="product__card full-height">
    <AppRow
      :lg-gutter="[8, 8]"
      class="full-height"
    >
      <AppCol :lg="12">
        <img
          v-if="data?.photo"
          :src="data?.photo"
          class="product__photo"
        />
        <img
          v-else
          src="./product_placeholder.png"
          class="product__photo"
        />
      </AppCol>

      <AppCol
        :lg="6"
        class="product__info_title"
      >
        Название:
      </AppCol>
      <AppCol
        :lg="6"
        class="product__info_value"
        >{{ data?.name }}</AppCol
      >
      <AppCol
        :lg="6"
        class="product__info_title"
      >
        Категория:
      </AppCol>
      <AppCol
        :lg="6"
        class="product__info_value"
        >{{
          getCategoryById(data?.categoryId)?.name
        }}</AppCol
      >
      <AppCol
        :lg="6"
        class="product__info_title"
      >
        Цена за шт:
      </AppCol>
      <AppCol
        :lg="6"
        class="product__info_value"
        >{{ data?.cost }}</AppCol
      >
      <AppCol
        :lg="6"
        class="product__info_title"
      >
        Количество на складе:
      </AppCol>
      <AppCol
        :lg="6"
        class="product__info_value"
        >{{ data?.warehouseAmount }}</AppCol
      >
      <AppCol
        :lg="6"
        v-if="data?.orderAmount"
        class="product__info_title"
      >
        Количество заказов:
      </AppCol>
      <AppCol
        :lg="6"
        v-if="data?.orderAmount"
        class="product__info_value"
        >{{ data?.orderAmount }}</AppCol
      >

      <AppCol
        :lg="12"
        class="product__actions"
      >
        <slot name="actions" />
      </AppCol>
    </AppRow>
  </div>
</template>
<style lang="scss" scoped>
.full-height {
  height: 100%;
}
.product {
  &__card {
    width: 100%;
    padding: 16px;
    border-width: 1px;
    border-color: var(--color-secondary);
    border-style: solid;
    position: relative;

    &::before {
      position: absolute;
      content: "";
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: var(--color-secondary);
      opacity: 0.1;
    }
  }
  &__photo {
    width: 100%;
    object-fit: cover;
  }
  &__info {
    &_title {
      font-size: 1rem;
      color: var(--color-disabled-text);
      font-weight: 600;
    }
    &_value {
      font-size: 1rem;
      text-transform: capitalize;
      color: var(--color-text);
      font-weight: 700;
      text-align: end;
    }
  }
  &__actions {
    align-self: flex-end;
  }
}
</style>
