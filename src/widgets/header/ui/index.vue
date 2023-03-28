<script setup lang="ts">
import { useCart } from "features/cart";
import { RouterNames } from "pages";
import { useNavigation } from "shared/lib";
import {
  AppCol,
  AppRow,
  AppContainer,
  AppLogo,
  AppButton,
} from "shared/ui";

const { navigateByRouteName, getNavList, checkNavItem } =
  useNavigation();

const { cartStoreProductsAmount } = useCart(undefined);
</script>
<template>
  <AppContainer class="header">
    <AppRow
      justify="space-between"
      align="middle"
    >
      <AppCol :lg="3">
        <AppLogo
          :lg-size="150"
          :md-size="100"
          :sm-size="150"
          :xs-size="100"
          @click="navigateByRouteName(RouterNames.MAIN)"
        />
      </AppCol>
      <AppCol
        :lg="9"
        class="navigation-wrapper"
      >
        <AppButton
          v-for="navItem in getNavList()"
          :key="navItem.index"
          :type="
            checkNavItem(navItem.routeName)
              ? 'primary'
              : 'secondary'
          "
          size="medium"
          @click="navigateByRouteName(navItem.routeName)"
          >{{
            navItem.name +
            (navItem.routeName === RouterNames.CART &&
            cartStoreProductsAmount > 0
              ? `(${cartStoreProductsAmount})`
              : "")
          }}
        </AppButton>
      </AppCol>
    </AppRow>
  </AppContainer>
</template>
<style lang="scss" scoped>
@import "../../../shared/ui/mixin.scss";
.navigation-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 16px;
  align-items: center;
}
.header {
  z-index: 200;
  box-shadow: 0 12px 16px rgb(0 0 0 / 5%);
  @include for-phone {
    display: none;
  }
  background-color: var(--color-background);
  width: 100%;
}
</style>
