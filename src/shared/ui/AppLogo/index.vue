<script lang="ts" setup>
import { computed } from "vue";
import { logo_image } from "shared/assets";

const emits = defineEmits(["click"]);

const props = defineProps({
  size: {
    type: Number,
    default: 20,
  },
  lgSize: {
    type: Number,
  },
  smSize: {
    type: Number,
  },
  mdSize: {
    type: Number,
  },
  xsSize: {
    type: Number,
  },
});
const lgSizeInPx = computed(
  () => `${props.lgSize || props.size}px`
);
const mdSizeInPx = computed(
  () => `${props.mdSize || props.size}px`
);
const smSizeInPx = computed(
  () => `${props.smSize || props.size}px`
);
const xsSizeInPx = computed(
  () => `${props.xsSize || props.size}px`
);
</script>

<template>
  <img
    class="icon"
    :src="logo_image"
    alt="logo"
    @click="emits('click')"
  />
</template>
<style lang="scss">
@import "../mixin.scss";
.icon {
  width: v-bind(lgSizeInPx);
  height: v-bind(lgSizeInPx);
  cursor: pointer;

  @include for-tablet-landscape-up {
    width: v-bind(mdSizeInPx);
    height: v-bind(mdSizeInPx);
  }

  @include for-tablet-portrait-up {
    width: v-bind(smSizeInPx);
    height: v-bind(smSizeInPx);
  }

  @include for-phone {
    width: v-bind(xsSizeInPx);
    height: v-bind(xsSizeInPx);
  }
}
</style>
