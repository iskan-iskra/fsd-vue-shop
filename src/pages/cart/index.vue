<script setup lang="ts">
import { TProduct, orderService } from "shared/api";
import { AppButton, AppCol, AppRow } from "shared/ui";
import { TCreateOrder } from "shared/api";
import { ref, onMounted, computed } from "vue";
import { useGlobalLoader } from "widgets/loader";
import {
  useCart,
  TCartStore,
  AppCartProduct,
} from "features/cart";
import { productService } from "shared/api";

const { cartStore, clearCartStore } = useCart(undefined);

const { setLoading } = useGlobalLoader();
const res = ref();
const createOrder = async () => {
  try {
    setLoading(true);
    const now = new Date();
    const testParams: TCreateOrder = {
      createdDate: now,
      productList: cartStore.value,
    };
    res.value = await orderService.createOrder(testParams);
    if (res.value) {
      clearCartStore();
    }
  } catch (error) {
    console.log("api error");
  } finally {
    setLoading(false);
  }
};

const data = ref<TProduct[]>([]);

const getProductsList = async (
  list: TCartStore[number]["id"][]
) => {
  try {
    setLoading(true);
    const res = await productService.getProductListByIds(
      list
    );
    if (res && res.length > 0) {
      data.value = res;
    }
  } catch (error) {
    console.log("api error");
  } finally {
    setLoading(false);
  }
};

const findByIdInCartList = (id: number) => {
  return (
    cartStore.value.find((el) => el.id === id)?.amount || 0
  );
};

const cartTotalCost = computed<number>(() => {
  return data.value.reduce(
    (acc, cur) =>
      acc + cur.cost * findByIdInCartList(cur.id),
    0
  );
});

const dynamicData = computed(() => {
  const reqIdList = cartStore.value.map((el) => el.id);
  return data.value.filter((el) =>
    reqIdList.includes(el.id)
  );
});

onMounted(async () => {
  const reqIdList: number[] = cartStore.value.map(
    (el) => el.id
  );
  if (reqIdList.length > 0)
    await getProductsList(reqIdList);
});
</script>
<template>
  <div class="cart__title">Корзина:</div>
  <div class="cart__wrapper">
    <template v-if="dynamicData.length > 0">
      <AppCartProduct
        class="cart__product"
        v-for="cartProduct in dynamicData"
        :key="cartProduct.id"
        :order-product="cartProduct"
        :amount-at-cart="findByIdInCartList(cartProduct.id)"
      ></AppCartProduct>
    </template>
    <div
      v-else
      class="cart__empty"
    >
      <div>Нет товаров на оформление заказа</div>
    </div>

    <AppRow
      justify="end"
      align="middle"
      :lg-gutter="[8, 8]"
      class="cart__actions"
    >
      <AppCol
        :lg="12"
        v-if="cartTotalCost"
        class="cart__total-cost"
      >
        Всего к оплате:
        {{ cartTotalCost }}
      </AppCol>
      <AppCol>
        <AppButton
          type="primary"
          @click="createOrder"
          outlined
          :disabled="!cartTotalCost"
          >Сделать заказ</AppButton
        >
      </AppCol>
      <AppCol>
        <AppButton
          type="error"
          @click="clearCartStore"
          :disabled="!cartTotalCost"
          outlined
          >Очистить корзину</AppButton
        >
      </AppCol>
    </AppRow>
  </div>
</template>

<style scoped lang="scss">
@import "../../shared/ui/mixin.scss";
.cart {
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

  &__wrapper {
    display: flex;
    flex-direction: column;
    min-height: calc(100% - 45px);
    @include for-phone {
      padding-top: 16px;
      min-height: 100%;
    }
  }

  &__empty {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      padding: 16px;
      color: var(--color-default);
      border: 1px solid var(--color-info);
    }
  }

  &__product {
    & + & {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid var(--color-default);
    }
  }

  &__total-cost {
    text-align: end;
    font-size: 1.2rem;
    font-weight: 600;
  }

  &__actions {
    justify-self: flex-end;
    position: sticky;
    bottom: 0;
    right: 0;
    margin-top: auto;
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
