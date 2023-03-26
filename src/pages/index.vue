<script setup lang="ts">
import { AppContainer } from "shared/ui";
import { computed, onMounted } from "vue";
import { RouterView } from "vue-router";
import Footer from "widgets/footer";
import Header from "widgets/header";
import Loader, { useGlobalLoader } from "widgets/loader";
import { useScrolled } from "shared/lib";
const { isLoading } = useGlobalLoader();
const { changedScrollBottom } = useScrolled();

const overflowStatus = computed(() => {
  if (isLoading.value) return "hidden";
  return "overlay";
});

const scrollHandler = (e: any) => {
  const elem = e.target;
  const scrollBottom = Math.round(
    elem.scrollHeight - elem.scrollTop - elem.clientHeight
  );
  if (scrollBottom < 10) {
    changedScrollBottom(true);
  } else {
    changedScrollBottom(false);
  }
};
</script>

<template>
  <div class="layout__wrapper">
    <Header />
    <AppContainer
      class="layout__content"
      @scroll="scrollHandler"
    >
      <RouterView />
    </AppContainer>
    <Loader v-show="isLoading"></Loader>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
@import "../shared/ui/mixin.scss";
.layout {
  &__wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: 100vh;
  }
  &__content {
    position: relative;
    overflow-y: hidden;
    width: 100%;
    flex-grow: 1;
    padding-top: 0;
    overflow-y: v-bind(overflowStatus);
    padding-bottom: 32px;
    @include for-phone {
      padding-top: 32px;
    }
  }
}
</style>
