<script setup lang="ts">
import { AppButton } from "shared/ui";
import { useFavorites, TFavorite } from "features/favorite";
import { PropType, onMounted, ref } from "vue";

const props = defineProps({
  id: {
    type: Number as PropType<TFavorite>,
    required: true,
  },
});

const {
  checkProductFavorite,
  addToFavoriteList,
  removeFromFavoriteList,
} = useFavorites();

const isFavorite = ref(false);

const checkFavorite = () => {
  isFavorite.value = checkProductFavorite(props.id);
};

const clickMethod = () => {
  if (isFavorite.value) {
    removeFromFavoriteList(props.id);
  } else {
    addToFavoriteList(props.id);
  }
  checkFavorite();
};

onMounted(() => {
  checkFavorite();
});
</script>

<template>
  <AppButton
    icon="heart"
    :type="isFavorite ? 'error' : 'default'"
    @click="clickMethod"
  />
</template>
