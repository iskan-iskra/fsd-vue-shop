<script setup lang="ts">
import { logo_image } from "shared/assets/";
</script>
<template>
  <div class="main__wrapper">
    <div class="main__logo">
      <img
        :src="logo_image"
        alt=""
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.main {
  &__logo {
  }
  &__wrapper {
    pointer-events: none;
    user-select: none;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
}
</style>
