<script setup lang="ts">
import {
  AppCartActionsButtons,
  AppCartRemoveButton,
} from "features/cart";
import { TProduct } from "shared/api";
import { useCategory } from "enitites/category";
import { AppCol, AppRow } from "shared/ui";
import { PropType } from "vue";

const { getCategoryById } = useCategory();

const props = defineProps({
  orderProduct: {
    type: Object as PropType<TProduct>,
    required: true,
  },

  amountAtCart: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <AppRow
    align="middle"
    :lg-gutter="[8, 16]"
  >
    <AppCol
      :lg="2"
      :sm="3"
      :xs="12"
    >
      <img
        v-if="orderProduct?.photo"
        :src="orderProduct?.photo"
        class="order__photo"
      />
      <img
        v-else
        src="./product_placeholder.png"
        class="order__photo"
      />
    </AppCol>
    <AppCol
      :lg="1"
      :sm="3"
      :xs="4"
    >
      <div class="title">Название</div>
      <div class="value">{{ orderProduct.name }}</div>
    </AppCol>
    <AppCol
      :lg="1"
      :sm="3"
      :xs="4"
    >
      <div class="title">Категория</div>
      <div class="value">
        {{ getCategoryById(orderProduct.categoryId)?.name }}
      </div>
    </AppCol>
    <AppCol
      :lg="1"
      :sm="3"
      :xs="4"
    >
      <div class="title">Номинал</div>
      <div class="value">{{ orderProduct.cost }}</div>
    </AppCol>
    <AppCol
      :lg="3"
      :sm="8"
      :xs="4"
      v-if="
        orderProduct.warehouseAmount ||
        orderProduct.warehouseAmount === 0
      "
    >
      <AppCartActionsButtons
        :id="orderProduct.id"
        :warehouseAmount="orderProduct.warehouseAmount"
      />
    </AppCol>
    <AppCol
      :lg="2"
      :sm="2"
      :xs="4"
      class="center"
    >
      <div class="title">Сумма</div>
      <div class="value">
        {{ amountAtCart * orderProduct.cost }}
      </div>
    </AppCol>
    <AppCol
      :lg="1"
      :sm="2"
      :xs="4"
    >
      <AppCartRemoveButton :id="orderProduct.id" />
    </AppCol>
  </AppRow>
</template>

<style lang="scss" scoped>
.center {
  text-align: center;
}

.title {
  font-weight: 600;
  color: var(--color-disabled-text);
}
.value {
  font-weight: 600;
  color: var(--color-text);
}
.order {
  &__photo {
    width: 100%;
    object-fit: cover;
  }
}
</style>
