<script setup lang="ts">
import { AppButton } from "shared/ui";
import { useCart } from "../model";

const props = defineProps({
  id: Number,
});

const { hardRemoveFromCart } = useCart(props.id);
</script>
<template>
  <AppButton
    type="error"
    @click="hardRemoveFromCart"
    >Удалить</AppButton
  >
</template>
