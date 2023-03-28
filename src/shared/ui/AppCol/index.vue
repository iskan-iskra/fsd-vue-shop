<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  lg: [String, Number],

  md: [String, Number],

  sm: [String, Number],

  xs: [String, Number],
});
const spanClasses = computed(() => {
  return [
    props.lg ? `lg-span-${props.lg}` : null,
    props.md ? `md-span-${props.md}` : null,
    props.sm ? `sm-span-${props.sm}` : null,
    props.xs ? `xs-span-${props.xs}` : null,
  ];
});
</script>
<template>
  <div
    class="app-col"
    :class="spanClasses"
  >
    <slot />
  </div>
</template>
<style lang="scss">
@use "sass:math";
@import "../mixin.scss";
@mixin span-list {
  &-span-1 {
    flex: 0 0 math.percentage(math.div(1, 12));
    max-width: math.percentage(math.div(1, 12));
  }

  &-span-2 {
    flex: 0 0 math.percentage(math.div(2, 12));
    max-width: math.percentage(math.div(2, 12));
  }

  &-span-3 {
    flex: 0 0 math.percentage(math.div(3, 12));
    max-width: math.percentage(math.div(3, 12));
  }

  &-span-4 {
    flex: 0 0 math.percentage(math.div(4, 12));
    max-width: math.percentage(math.div(4, 12));
  }
  &-span-5 {
    flex: 0 0 math.percentage(math.div(5, 12));
    max-width: math.percentage(math.div(5, 12));
  }

  &-span-6 {
    flex: 0 0 math.percentage(math.div(6, 12));
    max-width: math.percentage(math.div(6, 12));
  }

  &-span-7 {
    flex: 0 0 math.percentage(math.div(7, 12));
    max-width: math.percentage(math.div(7, 12));
  }

  &-span-8 {
    flex: 0 0 math.percentage(math.div(8, 12));
    max-width: math.percentage(math.div(8, 12));
  }

  &-span-9 {
    flex: 0 0 math.percentage(math.div(9, 12));
    max-width: math.percentage(math.div(9, 12));
  }

  &-span-10 {
    flex: 0 0 math.percentage(math.div(10, 12));
    max-width: math.percentage(math.div(10, 12));
  }

  &-span-11 {
    flex: 0 0 math.percentage(math.div(11, 12));
    max-width: math.percentage(math.div(11, 12));
  }

  &-span-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }

  &-span-auto {
    flex: 1;
    max-width: 100%;
  }
}
.app-col {
  display: block;
  position: relative;
  max-width: 100%;
  min-height: 1px;
  box-sizing: border-box;

  &.lg {
    @include span-list;
  }

  @include for-tablet-landscape-up {
    &.md {
      @include span-list;
    }
  }

  @include for-tablet-portrait-up {
    &.sm {
      @include span-list;
    }
  }

  @include for-phone {
    &.xs {
      @include span-list;
    }
  }
}
</style>
