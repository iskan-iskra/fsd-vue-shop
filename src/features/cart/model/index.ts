import { TOrder, TProduct } from "shared/api";
import { computed, ref } from "vue";
export type TCartStore = TOrder['productList']

const cartStore = ref<TCartStore>([])


export const useCart = (id: TProduct['id'] | undefined) => {
    const __getIndexOfItem = () => {
        return cartStore.value?.findIndex(el => el.id === id)
    }

    const __addToCart = () => {
        if (id !== undefined) {
            cartStore.value?.unshift({
                id: id,
                amount: 1
            })
        }

    }

    const __removeFromCart = (index: number) => {
        cartStore.value?.splice(index, 1)
    }

    const __increaseAmount = (index: number) => {
        cartStore.value[index].amount += 1
    }

    const __decreaseAmount = (index: number) => {
        cartStore.value[index].amount -= 1
    }

    const checkCartForProduct = () => {
        if (__getIndexOfItem() !== -1) return true
        return false
    }

    const addToCart = () => {
        if (!id && id !== 0) return
        const reqIndex = __getIndexOfItem()
        if (reqIndex === -1) {
            __addToCart();
        } else {
            __increaseAmount(reqIndex)
        }
    }

    const removeFromCart = () => {
        if (!id && id !== 0) return
        const reqIndex = __getIndexOfItem()
        if (cartStore.value[reqIndex].amount === 1) {
            __removeFromCart(reqIndex)
        } else {
            __decreaseAmount(reqIndex)
        }
    }

    const hardRemoveFromCart = () => {
        if (!id && id !== 0) return
        const reqIndex = __getIndexOfItem()
        if (reqIndex !== -1) __removeFromCart(reqIndex)

    }

    const getProductAmountAtCart = () => {
        if (!id && id !== 0) return 0
        const reqIndex = __getIndexOfItem()
        if (reqIndex !== -1) {
            return cartStore.value[reqIndex].amount
        }
        return 0
    }

    const clearCartStore = () => {
        cartStore.value = []
    }

    const cartStoreProductsAmount = computed(() => {
        return cartStore.value.reduce((acc, cur) => acc + cur.amount, 0)
    })

    return {
        cartStore,
        cartStoreProductsAmount,
        clearCartStore,
        addToCart,
        removeFromCart,
        checkCartForProduct,
        hardRemoveFromCart,
        getProductAmountAtCart
    }
}