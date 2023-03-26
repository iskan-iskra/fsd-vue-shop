<script setup lang="ts">
import { PropType, computed } from "vue";
import {
  delete_icon,
  cart_icon,
  close_icon,
  heart_icon,
  minus_icon,
  plus_icon,
  logo_icon,
  shopping_icon,
  cart_checked_icon,
  home_icon,
} from "shared/assets";

export type TBtnType =
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "default";

export type TBtnIcon =
  | "cart"
  | "plus"
  | "minus"
  | "close"
  | "heart"
  | "delete"
  | "logo"
  | "shopping"
  | "cart-history"
  | "home";

export type TBtnSize = "large" | "medium" | "small";
const props = defineProps({
  type: {
    type: String as PropType<TBtnType>,
    default: "primary" as TBtnType,
  },
  size: {
    type: String as PropType<TBtnSize>,
    default: "medium" as TBtnSize,
  },
  icon: {
    type: String as PropType<TBtnIcon>,
  },
  disabled: {
    type: Boolean,
  },
  outlined: {
    type: Boolean,
    default: false,
  },
});

const IconComponent = computed(() => {
  switch (props.icon) {
    case "plus":
      return plus_icon;
    case "minus":
      return minus_icon;
    case "heart":
      return heart_icon;
    case "cart":
      return cart_icon;
    case "delete":
      return delete_icon;
    case "close":
      return close_icon;
    case "logo":
      return logo_icon;
    case "shopping":
      return shopping_icon;
    case "cart-history":
      return cart_checked_icon;
    case "home":
      return home_icon;
  }
});

const iconSize = computed(() => {
  switch (props.size) {
    case "large":
      return "48px";
    case "medium":
      return "32px";
    case "small":
      return "24px";
  }
});

const btnSize = computed(() => {
  if (props.icon) {
    return "";
  } else {
    return props.size;
  }
});

const btnType = computed(() => {
  if (props.icon) {
    return "icon";
  } else {
    if (props.disabled) return "disabled";
    return props.type;
  }
});

const btnOutlined = computed(() => {
  if (props.outlined && !props.icon) {
    return "outlined";
  } else return "";
});

const icnOutlined = computed(() => {
  if (props.outlined) {
    return "outlined";
  } else return "";
});

const icnType = computed(() => {
  if (props.disabled) return "disabled";
  return props.type;
});

const emit = defineEmits(["click"]);

const btnClick = () => {
  if (props.disabled) return;
  emit("click");
};
</script>
<template>
  <button
    class="btn"
    :class="[btnSize, btnType, btnOutlined]"
    @click="btnClick"
  >
    <div
      v-if="icon"
      class="icon-wrapper"
      :class="[icnType, icnOutlined]"
    >
      <IconComponent class="icon" />
    </div>

    <slot v-else />
  </button>
</template>
<style lang="scss" scoped>
@mixin for-btn($color) {
  background-color: $color;
  border-color: $color;
  &.outlined {
    background-color: var(--color-background);
    color: $color;
  }
}
@mixin for-icn($color) {
  background-color: $color;
  border-color: $color;
  &.outlined {
    background-color: var(--color-background);
    .icon {
      fill: $color;
    }
  }
}

.btn {
  box-sizing: border-box;
  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: linear;
  color: var(--color-background);
  border-style: solid;
  border-width: 2px;
  &.icon {
    border-width: 0px;
  }

  &:active {
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.3);
  }
  &.primary {
    @include for-btn(var(--color-primary));
  }
  &.secondary {
    @include for-btn(var(--color-secondary));
  }
  &.error {
    @include for-btn(var(--color-error));
  }
  &.info {
    @include for-btn(var(--color-info));
  }
  &.default {
    @include for-btn(var(--color-default));
  }
  &.disabled {
    cursor: not-allowed;
    background-color: var(--color-disabled-background);
    border-color: var(--color-disabled-background);
    color: var(--color-disabled-text);
    &:active {
      box-shadow: none;
    }
    &.outlined {
      border-color: var(--color-disabled-text);
    }
  }
  &.medium {
    font-size: 1rem;
    line-height: 1rem;
    font-weight: 500;
    padding: 8px 16px;
  }
  &.small {
    font-size: 0.7rem;
    line-height: 0.5rem;
    font-weight: 400;
    padding: 4px 8px;
  }
  &.large {
    font-size: 1.2rem;
    line-height: 1.5rem;
    font-weight: 700;
    padding: 16px 24px;
  }
  .icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transition-property: background-color, color;
    transition-duration: 0.3s;
    transition-timing-function: linear;
    width: v-bind(iconSize);
    height: v-bind(iconSize);
    border-width: 2px;
    border-style: solid;

    &:active {
      box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);
    }
    &.primary {
      @include for-icn(var(--color-primary));
    }
    &.secondary {
      @include for-icn(var(--color-secondary));
    }
    &.error {
      @include for-icn(var(--color-error));
    }
    &.info {
      @include for-icn(var(--color-info));
    }
    &.default {
      @include for-icn(var(--color-default));
    }
    &.disabled {
      background-color: var(--color-disabled-background);
      border-color: var(--color-disabled-background);
      &:active {
        box-shadow: none;
      }
      &.outlined {
        background-color: var(--color-background);
        .icon {
          fill: var(--color-disabled-background);
        }
      }
    }
  }
  .icon {
    fill: white;
    width: 60%;
    height: 60%;
  }
  &.icon {
    border-radius: 50%;
  }
}
</style>
