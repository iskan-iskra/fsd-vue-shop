import { router } from "app/providers"
import { RouterNames } from "pages"
import { TBtnIcon } from "shared/ui";
import { computed, ref } from "vue"
import { useRoute } from "vue-router"

export type TNavItem = {
    index: number
    icon: TBtnIcon;
    routeName: RouterNames;
    name: string;
};
const useNavigation = () => {
    const __navList = ref<TNavItem[]>([
        {
            index: 1,
            icon: "shopping",
            routeName: RouterNames.PRODUCT_LIST,
            name: "Каталог",
        },
        {
            index: 2,
            icon: "heart",
            routeName: RouterNames.FAVORITES,
            name: "Избранное",
        },
        {
            index: 3,
            icon: "cart",
            routeName: RouterNames.CART,
            name: "Корзина",
        },
        {
            index: 4,
            icon: "cart-history",
            routeName: RouterNames.ORDER_HISTORY,
            name: "История",
        },
    ])

    const navigateByRouteName = (name: RouterNames) => {
        router.push({ name: name })
    }

    const getCurrentRouteName = computed(() => {
        return useRoute().name
    })

    const getNavList = (): TNavItem[] => {
        return __navList.value.sort((a, b) => a.index - b.index)
    }

    const checkNavItem = (router: RouterNames): boolean => {
        return getCurrentRouteName?.value === router;
    };

    return {
        navigateByRouteName,
        getCurrentRouteName,
        getNavList,
        checkNavItem
    }
}


export default useNavigation
