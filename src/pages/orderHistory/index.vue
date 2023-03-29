<script setup lang="ts">
import AppOrder from "enitites/order";
import { TOrder, orderService } from "shared/api";
import { onMounted, ref } from "vue";
import { useGlobalLoader } from "widgets/loader";
const { setLoading } = useGlobalLoader();
const orderList = ref<TOrder[]>([]);

onMounted(async () => {
  try {
    setLoading(true);
    const res = await orderService.getOrders();
    if (res) {
      orderList.value = res;
    }
  } catch (error) {
    console.log("api error");
  } finally {
    setLoading(false);
  }
});
</script>
<template>
  <div class="history__title">
    История
    <span class="history__sub-title">
      (всего заказов: {{ orderList.length }})
    </span>
  </div>
  <div class="history__wrapper">
    <AppOrder
      v-for="order in orderList"
      class="history__item"
      :key="order.id"
      :order-data="order"
    ></AppOrder>
  </div>
</template>

<style lang="scss" scoped>
@import "../../shared/ui/mixin.scss";

.history {
  &__item {
    & + & {
      padding-top: 16px;
      margin-top: 16px;
      border-top: 1px solid var(--color-disabled-text);
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    min-height: calc(100% - 45px);
    @include for-phone {
      padding-top: 16px;
      min-height: 100%;
    }
  }

  &__sub-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-disabled-text);
  }

  &__title {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-text);
    position: sticky;
    width: fit-content;
    top: 0;
    z-index: 120;
    @include for-phone {
      position: fixed;
      top: 0;
    }
    &::after {
      content: "";
      z-index: -1;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      backdrop-filter: blur(10px);
    }
  }
}
</style>
