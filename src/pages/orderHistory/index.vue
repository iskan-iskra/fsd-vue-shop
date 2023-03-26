<script setup lang="ts">
import { orderService } from "shared/api";
import { onMounted, ref } from "vue";
import { useGlobalLoader } from "widgets/loader";
const { setLoading } = useGlobalLoader();
const orderList = ref();

onMounted(async () => {
  try {
    setLoading(true);
    orderList.value = await orderService.getOrders();
  } catch (error) {
    console.log("api error");
  } finally {
    setLoading(false);
  }
});
</script>
<template>
  <div>History</div>
  <pre>
    {{ orderList }}
  </pre>
</template>
