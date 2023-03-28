import { TProduct, productService } from "shared/api";
import { ref } from "vue";

export type TFavorite = TProduct['id']

const favoriteList = ref<TFavorite[]>([])

export const useFavorites = () => {
    const addToFavoriteList = (id: TFavorite) => {
        const reqIndex = favoriteList.value.findIndex(el => el === id)
        if (reqIndex === -1) favoriteList.value.unshift(id)
    }

    const removeFromFavoriteList = (id: TFavorite) => {
        const reqIndex = favoriteList.value.findIndex(el => el === id)
        favoriteList.value.splice(reqIndex, 1)
    }

    const getFavoritesFromBack = async (): Promise<TProduct[] | void> => {
        if (favoriteList.value.length > 0) {
            try {
                const res = await productService.getProductListByIds(favoriteList.value)
                if (res && res.length > 0) {
                    return res
                }
            } catch (error) {
                console.log(error);
                throw error
            }
        } else {
            console.log('FavoriteList is empty');
        }
    }

    const checkProductFavorite = (id: TFavorite | undefined) => {
        if (id || id === 0) return favoriteList.value.includes(id)
        return false
    }

    return {
        checkProductFavorite,
        addToFavoriteList,
        removeFromFavoriteList,
        getFavoritesFromBack,
        favoriteList
    }
}

