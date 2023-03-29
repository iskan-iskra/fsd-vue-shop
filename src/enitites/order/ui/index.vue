<script lang="ts" setup>
import { useCart } from "features/cart";
import {
  TOrder,
  TProduct,
  productService,
} from "shared/api";
import { useCategory } from "shared/lib";
import { AppButton, AppCol, AppRow } from "shared/ui";
import { PropType, computed, ref } from "vue";
import { useGlobalLoader } from "widgets/loader";

const { setLoading } = useGlobalLoader();

const { getCategoryById } = useCategory();

const { clearCartStore, repeatCartByOrderData } =
  useCart(undefined);

const props = defineProps({
  orderData: {
    type: Object as PropType<TOrder>,
    required: true,
  },
});

const dateFormatter = (date: Date) => {
  const reqDate = new Date(date);

  const reqYear = reqDate.getFullYear();
  const reqMonth = reqDate.getMonth();
  const reqDay = reqDate.getDate();
  const reqHour = reqDate.getHours();
  const reqMinut = reqDate.getMinutes();
  return (
    [
      reqHour < 10 ? "0" + reqHour : reqHour,
      reqMinut < 10 ? "0" + reqMinut : reqMinut,
    ].join(":") +
    " " +
    [reqDay, reqMonth, reqYear].join("/")
  );
};

const productList = ref<TProduct[]>([]);

const productListIds = computed(() => {
  return (
    props.orderData.productList.map((el) => el.id) || []
  );
});

const getProductInfo = async () => {
  try {
    setLoading(true);
    const res = await productService.getProductListByIds(
      productListIds.value
    );
    if (res) {
      productList.value = res;
    }
  } catch (error) {
    console.log(error);
    console.log("api problem");
  } finally {
    setLoading(false);
  }
};

const isOpenedProductsList = ref(false);

const openProductsList = async () => {
  isOpenedProductsList.value = true;
  if (
    productList.value.length < productListIds.value.length
  ) {
    await getProductInfo();
  }
};

const closeProductsList = () => {
  isOpenedProductsList.value = false;
};

const repeatOrder = () => {
  clearCartStore();
  repeatCartByOrderData([...props.orderData.productList]);
};
</script>

<template>
  <AppRow
    align="middle"
    :lg-gutter="[8, 8]"
  >
    <AppCol
      :lg="3"
      :md="3"
      :sm="4"
      :xs="12"
    >
      <span class="order__title">Время заказа: </span>
      <span class="order__value">
        {{ dateFormatter(orderData.createdDate) }}
      </span>
    </AppCol>
    <AppCol
      :lg="5"
      :md="4"
      :sm="3"
      :xs="12"
    >
      <span class="order__title">Количество товаров: </span>
      <span class="order__value">
        {{
          orderData.productList.reduce(
            (acc, cur) => acc + cur.amount,
            0
          )
        }}
      </span>
    </AppCol>
    <AppCol
      :lg="4"
      :md="5"
      :sm="5"
      :xs="12"
    >
      <AppRow
        :lg-gutter="[16, 0]"
        :xs-gutter="[0, 0]"
        align="middle"
      >
        <AppCol :lg="6"
          ><AppButton
            v-if="isOpenedProductsList"
            outlined
            type="info"
            @click="closeProductsList"
            >Скрыть список</AppButton
          >
          <AppButton
            v-else
            outlined
            type="info"
            @click="openProductsList"
            >Показать список</AppButton
          ></AppCol
        >
        <AppCol :lg="6">
          <AppButton
            outlined
            type="primary"
            @click="repeatOrder"
            >Повторить заказ</AppButton
          ></AppCol
        >
      </AppRow>
    </AppCol>
    <AppCol
      v-if="productList.length > 0 && isOpenedProductsList"
      :lg="12"
      class="order__product-list"
    >
      <AppRow :lg-gutter="[16, 16]">
        <AppCol
          :lg="2"
          :md="3"
          :sm="4"
          :xs="12"
          v-for="product in productList"
          :key="product.id"
        >
          <div class="order__product">
            <div class="order__product_field">
              <div class="order__product_title">
                Название:
              </div>
              <div>{{ product.name }}</div>
            </div>
            <div class="order__product_field">
              <div class="order__product_title">
                Категория:
              </div>
              <div>
                {{
                  getCategoryById(product.categoryId)?.name
                }}
              </div>
            </div>
            <div
              v-if="
                orderData.productList.find(
                  (el) => el.id === product.id
                )?.amount
              "
              class="order__product_field"
            >
              <div class="order__product_title">
                Количество:
              </div>
              <div>
                {{
                  orderData.productList.find(
                    (el) => el.id === product.id
                  )?.amount || 0
                }}шт
              </div>
            </div>
            <div class="order__product_field">
              <div class="order__product_title">
                Стоимость:
              </div>
              <div>{{ product.cost }}</div>
            </div>
            <div
              v-if="
                orderData.productList.find(
                  (el) => el.id === product.id
                )?.amount
              "
              class="order__product_field"
            >
              <div class="order__product_title">Сумма:</div>
              <div>
                {{
                  product.cost *
                  (orderData.productList.find(
                    (el) => el.id === product.id
                  )?.amount || 0)
                }}
              </div>
            </div>
          </div>
        </AppCol>
        <AppCol :lg="12">
          <div>
            <span class="order__title">
              Итого сумма заказа:
            </span>
            <span class="order__value">
              {{
                productList.reduce(
                  (acc, cur) =>
                    acc +
                    cur.cost *
                      (orderData.productList.find(
                        (el) => el.id === cur.id
                      )?.amount || 0),
                  0
                )
              }}</span
            >
          </div>
        </AppCol>
      </AppRow>
    </AppCol>
  </AppRow>
</template>

<style lang="scss" scoped>
.order {
  &__title {
    color: var(--color-disabled-text);
    font-weight: 600;
  }

  &__value {
    font-weight: 600;
    color: var(--color-text);
  }

  &__product-list {
    width: 100%;
  }

  &__product {
    padding: 8px;
    border: 1px dashed var(--color-default);
    display: flex;
    flex-direction: column;
    gap: 8px;

    &_field {
      display: flex;
      justify-content: space-between;
    }

    &_title {
      font-weight: 500;
      color: var(--color-disabled-text);
    }
  }
}
</style>
