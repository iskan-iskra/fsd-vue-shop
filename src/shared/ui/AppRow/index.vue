<script setup lang="ts">
import { PropType, computed } from "vue";

type TJustify =
  | "start"
  | "end"
  | "center"
  | "space-between"
  | "space-around";

type TAlign = "top" | "bottom" | "middle";

type TWrap = "wrap" | "no-wrap";

const props = defineProps({
  lgGutter: {
    type: Array,
    default: () => [],
  },
  mdGutter: {
    type: Array,
    default: () => [],
  },
  smGutter: {
    type: Array,
    default: () => [],
  },
  xsGutter: {
    type: Array,
    default: () => [],
  },
  justify: {
    type: String as PropType<TJustify>,
    default: "start" as TJustify,
  },

  align: {
    type: String as PropType<TAlign>,
    default: "start" as TAlign,
  },

  wrap: {
    type: String as PropType<TWrap>,
    default: "wrap" as TWrap,
  },
});
const hGapClasses = computed(() => {
  return [
    props.lgGutter[0] !== undefined
      ? `lg-h-gap-${props.lgGutter[0]}`
      : null,
    props.mdGutter[0] !== undefined
      ? `md-h-gap-${props.mdGutter[0]}`
      : null,
    props.smGutter[0] !== undefined
      ? `sm-h-gap-${props.smGutter[0]}`
      : null,
    props.xsGutter[0] !== undefined
      ? `xs-h-gap-${props.smGutter[0]}`
      : null,
  ];
});

const vGapClasses = computed(() => {
  return [
    props.lgGutter[1] !== undefined
      ? `lg-v-gap-${props.lgGutter[1]}`
      : null,
    props.mdGutter[1] !== undefined
      ? `md-v-gap-${props.mdGutter[1]}`
      : null,
    props.smGutter[1] !== undefined
      ? `sm-v-gap-${props.smGutter[1]}`
      : null,
    props.xsGutter[1] !== undefined
      ? `xs-v-gap-${props.smGutter[1]}`
      : null,
  ];
});

const justifyClass = computed(() => {
  return "jc-" + props.justify;
});

const alignClass = computed(() => {
  return "ai-" + props.align;
});

const wrapClass = computed(() => {
  return props.wrap;
});
</script>
<template>
  <div
    class="app-row"
    :class="[
      justifyClass,
      alignClass,
      vGapClasses,
      hGapClasses,
      wrapClass,
    ]"
  >
    <slot />
  </div>
</template>
<style lang="scss">
@import "../mixin.scss";
@mixin v-gap-list {
  &-v-gap-0 {
    row-gap: 0px;
  }

  &-v-gap-4 {
    row-gap: 4px;
  }

  &-v-gap-8 {
    row-gap: 8px;
  }

  &-v-gap-12 {
    row-gap: 16px;
  }

  &-v-gap-16 {
    row-gap: 16px;
  }

  &-v-gap-20 {
    row-gap: 20px;
  }

  &-v-gap-24 {
    row-gap: 24px;
  }

  &-v-gap-32 {
    row-gap: 32px;
  }

  &-v-gap-40 {
    row-gap: 40px;
  }

  &-v-gap-48 {
    row-gap: 48px;
  }
}
@mixin h-gap-list {
  &-h-gap-0 {
    // margin-left: 0px;
    // margin-right: 0px;

    & > .app-col {
      padding-left: 0px;
      padding-right: 0px;
    }
  }

  &-h-gap-4 {
    // margin-left: -2px;
    // margin-right: -2px;

    & > .app-col {
      padding-left: 2px;
      padding-right: 2px;
    }
  }

  &-h-gap-8 {
    // margin-left: -4px;
    // margin-right: -4px;

    & > .app-col {
      padding-left: 4px;
      padding-right: 4px;
    }
  }

  &-h-gap-12 {
    // margin-left: -6px;
    // margin-right: -6px;

    & > .app-col {
      padding-left: 6px;
      padding-right: 6px;
    }
  }

  &-h-gap-16 {
    // margin-left: -8px;
    // margin-right: -8px;

    & > .app-col {
      padding-left: 8px;
      padding-right: 8px;
    }
  }

  &-h-gap-24 {
    // margin-left: -12px;
    // margin-right: -12px;

    & > .app-col {
      padding-left: 12px;
      padding-right: 12px;
    }
  }

  &-h-gap-32 {
    // margin-left: -16px;
    // margin-right: -16px;

    & > .app-col {
      padding-left: 16px;
      padding-right: 16px;
    }
  }

  &-h-gap-40 {
    // margin-left: -20px;
    // margin-right: -20px;

    & > .app-col {
      padding-left: 20px;
      padding-right: 20px;
    }
  }

  &-h-gap-48 {
    // margin-left: -24px;
    // margin-right: -24px;

    & > .app-col {
      padding-left: 24px;
      padding-right: 24px;
    }
  }
}
.app-row {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  &.jc-start {
    justify-content: flex-start;
  }

  &.jc-end {
    justify-content: flex-end;
  }

  &.jc-center {
    justify-content: center;
  }

  &.jc-space-between {
    justify-content: space-between;
  }

  &.jc-space-around {
    justify-content: space-around;
  }

  &.ai-top {
    align-items: flex-start;
  }

  &.ai-middle {
    align-items: center;
  }

  &.ai-bottom {
    align-items: flex-end;
  }

  &.wrap {
    flex-wrap: wrap;
  }

  &.no-wrap {
    flex-wrap: nowrap;
  }

  &.lg {
    @include h-gap-list;
    @include v-gap-list;
  }

  @include for-tablet-landscape-up {
    &.md {
      @include h-gap-list;
      @include v-gap-list;
    }
  }

  @include for-tablet-portrait-up {
    &.sm {
      @include h-gap-list;
      @include v-gap-list;
    }
  }

  @include for-phone {
    &.xs {
      @include h-gap-list;
      @include v-gap-list;
    }
  }
}
</style>
