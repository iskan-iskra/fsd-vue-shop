<script setup lang="ts">
import { orderService } from "shared/api";
import { AppButton } from "shared/ui";
import { TCreateOrder } from "shared/api";
import { ref } from "vue";
import { useGlobalLoader } from "widgets/loader";

const { setLoading } = useGlobalLoader();
const res = ref();
const createOrder = async () => {
  try {
    setLoading(true);
    const now = new Date();
    const testParams: TCreateOrder = {
      createdDate: now,
      productList: [
        {
          id: 5,
          amount: 3,
        },
        {
          id: 3,
          amount: 3,
        },
      ],
    };
    res.value = await orderService.createOrder(testParams);
  } catch (error) {
    console.log("api error");
  } finally {
    setLoading(false);
  }
};
</script>
<template>
  <div>cart</div>
  <AppButton @click="createOrder"></AppButton>
  <pre>  {{ res }}</pre>
</template>
