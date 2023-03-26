<script setup lang="ts">
import {
  AppButton,
  AppCol,
  AppContainer,
  AppRow,
} from "shared/ui";
import { useNavigation } from "shared/lib";
import { RouterNames } from "pages";

const { navigateByRouteName, getNavList, checkNavItem } =
  useNavigation();
</script>
<template>
  <AppContainer class="footer">
    <AppRow justify="space-around">
      <AppCol
        :lg="2"
        class="nav-item"
      >
        <AppButton
          size="large"
          icon="home"
          :type="
            checkNavItem(RouterNames.MAIN)
              ? 'primary'
              : 'secondary'
          "
          :outlined="!checkNavItem(RouterNames.MAIN)"
          @click="navigateByRouteName(RouterNames.MAIN)"
        />
      </AppCol>
      <AppCol
        :lg="2"
        class="nav-item"
        v-for="navItem in getNavList()"
        :key="navItem.index"
      >
        <AppButton
          size="large"
          :icon="navItem.icon"
          :type="
            checkNavItem(navItem.routeName)
              ? 'primary'
              : 'secondary'
          "
          :outlined="!checkNavItem(navItem.routeName)"
          @click="navigateByRouteName(navItem.routeName)"
        />
      </AppCol>
    </AppRow>
  </AppContainer>
</template>
<style lang="scss" scoped>
@import "../../../shared/ui/mixin.scss";
.footer {
  z-index: 200;
  display: none;
  background-color: var(--color-background);
  width: 100%;
  box-shadow: 0 12px 16px rgb(0 0 0 / 5%);
  @include for-phone {
    display: block;
  }
}
.nav-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
}
</style>
