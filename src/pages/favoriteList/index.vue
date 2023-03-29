<script setup lang="ts">
import { AppCol, AppRow } from "shared/ui";
import { onMounted, ref } from "vue";
import { productService, TProduct } from "shared/api";
import {
  TFavorite,
  useFavorites,
  AppButtonFavorite,
} from "features/favorite";
import AppProductCard from "enitites/product";
import { useGlobalLoader } from "widgets/loader";
import { AppCartActionsButtons } from "features/cart";
const { favoriteList } = useFavorites();
const { setLoading } = useGlobalLoader();
const data = ref<TProduct[]>([]);

const getProductsList = async (list: TFavorite[]) => {
  try {
    setLoading(true);
    const res = await productService.getProductListByIds(
      list
    );
    if (res && res.length > 0) {
      data.value = res;
    }
  } catch (error) {
    console.log("api error");
  } finally {
    setLoading(false);
  }
};

onMounted(async () => {
  if (favoriteList.value.length > 0)
    await getProductsList(favoriteList.value);
});
</script>
<template>
  <div
    class="favorite-list__title"
    v-if="data.length > 0"
  >
    Избранные товары:
  </div>
  <AppRow
    class="favorite-list__wrapper"
    :lg-gutter="[16, 16]"
    v-if="data.length > 0"
    justify="start"
  >
    <AppCol
      :lg="3"
      :md="4"
      :sm="6"
      :xs="12"
      v-for="item in data"
      :key="item.id"
    >
      <AppProductCard :data="item">
        <template #actions>
          <AppRow v-if="item.id || item.id === 0">
            <AppCol :lg="3">
              <AppButtonFavorite :id="item.id" />
            </AppCol>
            <AppCol
              :lg="9"
              v-if="
                item.warehouseAmount ||
                item.warehouseAmount === 0
              "
            >
              <AppCartActionsButtons
                :id="item.id"
                :warehouseAmount="item.warehouseAmount"
              />
            </AppCol>
          </AppRow>
        </template>
      </AppProductCard>
    </AppCol>
  </AppRow>
  <div
    v-else
    class="favorite-list__not-found"
  >
    <div>Нет избранных товаров</div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../shared/ui/mixin.scss";
.favorite-list {
  &__title {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-text);
    position: sticky;
    width: fit-content;
    top: 0;
    z-index: 120;
    @include for-phone {
      position: fixed;
      top: 0;
    }
    &::after {
      content: "";
      z-index: -1;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.7);
    }
  }

  &__wrapper {
    margin-top: 16px;
  }

  &__not-found {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-text);
  }
}
</style>
