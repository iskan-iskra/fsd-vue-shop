import { TProduct, productService } from "shared/api";
import { ref } from "vue";

export type TFavorite = TProduct['id']

const favoriteList = ref<TFavorite[]>([])

const localStorageKey = "shop_kz_favorite_list"
const localStorageDivider = "|"

const readLocalStorage = () => {
    if (favoriteList.value.length > 0) return
    const reqString = localStorage.getItem(localStorageKey)
    const reqArray = reqString?.split(localStorageDivider) ?? []
    reqArray.forEach((el) => {
        if (!el) return
        const numberEl = +el
        if (Number.isInteger(numberEl)) {
            favoriteList.value.unshift(numberEl)
        }
    })
}

const writeLocalStorage = () => {
    const res = favoriteList.value.join(localStorageDivider) ?? []
    localStorage.setItem(localStorageKey, res)
}

export const useFavorites = () => {
    readLocalStorage();
    const addToFavoriteList = (id: TFavorite) => {
        const reqIndex = favoriteList.value.findIndex(el => el === id)

        if (reqIndex === -1) {
            favoriteList.value.unshift(id)
            writeLocalStorage();
        }
    }

    const removeFromFavoriteList = (id: TFavorite) => {
        const reqIndex = favoriteList.value.findIndex(el => el === id)
        favoriteList.value.splice(reqIndex, 1)
        writeLocalStorage();
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

