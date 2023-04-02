<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import {
  TCategory,
  TProduct,
  productService,
  TProductSort,
} from "shared/api";
import { useGlobalLoader } from "widgets/loader";
import AppProductCard from "enitites/product";
import { AppCol, AppRow } from "shared/ui";
import {
  AppProductCategoryDesktop,
  AppProductCategoryMobile,
} from "enitites/category";
import {
  AppProductSortDesktop,
  AppProductSortMobile,
} from "features/productSort";

import { useScrolled } from "shared/lib";
import { AppButtonFavorite } from "features/favorite";
import { AppCartActionsButtons } from "features/cart";

const { setLoading } = useGlobalLoader();
const { isScrollBottom } = useScrolled();

const data = ref<TProduct[]>([]);
const totalPages = ref<Number>();

const requiredPage = ref<number>(1);

const defaultPageSize = ref<number>(10);

const getProductsByCategory = async (
  categoryId: TCategory["id"],
  sortMethod?: TProductSort
) => {
  try {
    setLoading(true);
    const res = await productService.getProductsByCategory({
      pageSize: defaultPageSize.value,
      page: requiredPage.value,
      category: categoryId,
      sort: sortMethod,
    });
    if (res && res?.list.length > 0) {
      totalPages.value = res.totalPages;
      data.value = data.value.concat(res.list);
    }
  } catch (error) {
    console.log("api error");
  } finally {
    setLoading(false);
  }
};

const defaultProducts = async (
  sortMethod?: TProductSort
) => {
  try {
    setLoading(true);
    const res = await productService.getProductsList({
      pageSize: defaultPageSize.value,
      page: requiredPage.value,
      sort: sortMethod,
    });
    if (res && res?.list.length > 0) {
      totalPages.value = res.totalPages;
      data.value = data.value.concat(res.list);
    }
  } catch (error) {
    console.log("api error");
  } finally {
    setLoading(false);
  }
};

const currentCategory = ref<TCategory>();
const currentSortMethod = ref<TProductSort>();

const chooseCategory = async (
  val: TCategory | undefined
) => {
  data.value = [];
  requiredPage.value = 1;
  currentCategory.value = val;
  await searchMethod();
};

const chooseSortMethod = async (
  val: TProductSort | undefined
) => {
  data.value = [];
  requiredPage.value = 1;
  currentSortMethod.value = val;
  await searchMethod();
};

const searchMethod = async () => {
  if (currentCategory.value) {
    await getProductsByCategory(
      currentCategory.value.id,
      currentSortMethod.value
    );
  } else {
    await defaultProducts(currentSortMethod.value);
  }
};

watch(
  () => isScrollBottom.value,
  async () => {
    if (isScrollBottom.value) {
      if (requiredPage.value + 1 !== totalPages.value) {
        requiredPage.value += 1;
        await searchMethod();
      }
    }
  },
  { immediate: true }
);

onMounted(async () => {
  await defaultProducts();
});
</script>
<template>
  <div class="productList__categories desktop">
    <div class="productList__title">Категории:</div>
    <AppProductCategoryDesktop
      :current-category="currentCategory"
      @choose-category="chooseCategory"
    />
    <hr />
    <div class="productList__title">Сортировать по:</div>
    <AppProductSortDesktop
      :current-sort="currentSortMethod"
      @choose-sort="chooseSortMethod"
    />
  </div>
  <div class="productList__categories mobile">
    <AppProductCategoryMobile
      class="mobile__item"
      :current-category="currentCategory"
      @choose-category="chooseCategory"
    />
    <AppProductSortMobile
      class="mobile__item"
      :current-sort="currentSortMethod"
      @choose-sort="chooseSortMethod"
    />
  </div>
  <AppRow
    class="productList__wrapper"
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
</template>
<style lang="scss" scoped>
@import "../../shared/ui/mixin.scss";
.mobile {
  display: none;
  @include for-phone {
    display: flex;
    flex-direction: row;
    &__item {
      width: 50%;
    }
  }
}
.desktop {
  display: block;
  @include for-phone {
    display: none;
  }
}
.productList {
  &__wrapper {
    margin-left: auto;
    margin-top: 0;
    width: 85%;

    @include for-tablet-landscape-up {
      width: 80%;
    }
    @include for-tablet-portrait-up {
      width: 75%;
    }
    @include for-phone {
      margin-top: 50px;
      margin-left: 0;
      width: 100%;
    }
  }
  &__title {
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
  }
  &__categories {
    z-index: 100;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: initial;
    width: 15%;
    padding-top: 170px;
    box-shadow: none;
    background-color: var(--color-background);
    @include for-tablet-landscape-up {
      width: 20%;
      padding-top: 120px;
      box-shadow: none;
    }
    @include for-tablet-portrait-up {
      width: 25%;
      padding-top: 170px;
      box-shadow: none;
    }
    @include for-phone {
      box-shadow: 0 12px 16px rgb(0 0 0 / 5%);
      padding-top: 0;
      left: 0;
      top: 0;
      right: 0;
      bottom: initial;
      width: 100%;
      height: 50px;
      padding-top: 8px;
    }
  }
}
</style>
