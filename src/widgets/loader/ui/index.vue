<script setup lang="ts"></script>
<template>
  <div class="loader">
    <div class="loader__blur"></div>
    <div class="loader__icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        style="
          margin: auto;
          background: none;
          display: block;
          shape-rendering: auto;
        "
        width="200px"
        height="200px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke-width="10"
          r="35"
          stroke-dasharray="164.93361431346415 56.97787143782138"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          ></animateTransform>
        </circle>
        <!-- [ldio] generated by https://loading.io/ -->
      </svg>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  &__blur {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 110;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(1px);
  }
  &__icon {
    z-index: 120;
    circle {
      stroke: var(--color-secondary);
    }
  }
}
</style>
