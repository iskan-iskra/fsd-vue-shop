<script setup lang="ts">
import { TProduct, orderService } from "shared/api";
import { AppButton, AppCol, AppRow } from "shared/ui";
import { TCreateOrder } from "shared/api";
import { ref, onMounted } from "vue";
import { useGlobalLoader } from "widgets/loader";
import { useCart, TCartStore } from "features/cart";
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
    <template
      v-for="cartProduct in data"
      :key="cartProduct.id"
    >
      <AppRow>
        <AppCol :lg="4">{{ cartProduct.name }}</AppCol>
        <AppCol :lg="4">{{ cartProduct.cost }}</AppCol>
        <AppCol :lg="4">{{
          cartProduct.categoryId
        }}</AppCol>
      </AppRow>

      <hr />
    </template>

    <AppRow
      justify="end"
      align="middle"
      :lg-gutter="[8, 8]"
      class="cart__actions"
    >
      <AppCol>
        <AppButton
          type="primary"
          @click="createOrder"
          outlined
          >Сделать заказ</AppButton
        >
      </AppCol>
      <AppCol>
        <AppButton
          type="error"
          @click="clearCartStore"
          outlined
          >Очистить корзину</AppButton
        >
      </AppCol>
    </AppRow>
  </div>
</template>

<style scoped lang="scss">
.cart {
  @import "../../shared/ui/mixin.scss";
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

  &__actions {
    justify-self: flex-end;
    position: sticky;
    bottom: 0;
    right: 0;
    margin-top: auto;
  }
}
</style>
