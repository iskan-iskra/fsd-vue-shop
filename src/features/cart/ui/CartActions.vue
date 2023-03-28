<script setup lang="ts">
import { AppButton } from "shared/ui";
import { useCart } from "features/cart";
import { PropType, onMounted, ref } from "vue";
import { TProduct } from "shared/api";

const props = defineProps({
  id: {
    type: Number as PropType<TProduct["id"]>,
    required: true,
  },
  warehouseAmount: {
    type: Number as PropType<TProduct["warehouseAmount"]>,
    required: true,
  },
});

const {
  addToCart,
  checkCartForProduct,
  removeFromCart,
  getProductAmountAtCart,
} = useCart(props.id);

const isProductInCart = ref(false);

const productAmountAtCart = ref<Number>(0);

const addToCartMethod = () => {
  if (props.warehouseAmount === productAmountAtCart.value) {
    return;
  }
  addToCart();
  checkProductInCartState();
};

const removeFromCartMethod = () => {
  removeFromCart();
  checkProductInCartState();
};

const checkProductInCartState = () => {
  isProductInCart.value = checkCartForProduct();
  productAmountAtCart.value = getProductAmountAtCart();
};

onMounted(() => {
  checkProductInCartState();
});
</script>
<template>
  <div
    class="actions__wrapper"
    v-if="isProductInCart"
  >
    <AppButton
      type="error"
      @click="removeFromCartMethod"
      icon="minus"
    />
    <div>{{ productAmountAtCart }}</div>
    <AppButton
      type="secondary"
      @click="addToCartMethod"
      icon="plus"
    />
  </div>
  <div
    class="actions__wrapper"
    v-else
  >
    <AppButton
      type="primary"
      :disabled="warehouseAmount < 1"
      @click="addToCartMethod"
      icon="cart"
    />
  </div>
</template>
<style lang="scss" scoped>
.actions {
  &__wrapper {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
  }
}
</style>
