<script setup lang="ts">
import { AppButton } from "shared/ui";
import { onMounted, ref } from "vue";
import { productService, orderService } from "shared/api";

const data = ref();

onMounted(async () => {});
</script>
<template>
  <div>FAVORITE_PAGE</div>

  <pre>{{ data }}</pre>
</template>

<style lang="scss" scoped></style>
