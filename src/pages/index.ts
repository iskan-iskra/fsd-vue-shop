import Routing from './index.vue';

export enum RouterNames {
    CART = "CART",
    MAIN = "MAIN",
    FAVORITES = "FAVORITES",
    PRODUCT_LIST = "PRODUCT_LIST",
    ORDER_HISTORY = "ORDER_HISTORY",
    ERROR = "ERROR"
}

export const routes = [
    {
        path: '/',
        name: RouterNames.MAIN,
        component: () => import('./main')
    },
    {
        path: '/favorites',
        name: RouterNames.FAVORITES,
        component: () => import('./favoriteList')
    },
    {
        path: '/cart',
        name: RouterNames.CART,
        component: () => import('./cart')
    },
    {
        path: '/product-list',
        name: RouterNames.PRODUCT_LIST,
        component: () => import('./productList')
    },
    {
        path: '/order-history',
        name: RouterNames.ORDER_HISTORY,
        component: () => import('./orderHistory')
    },
    {
        path: '/error',
        name: RouterNames.ERROR,
        component: () => import('./error')
    },
    {
        path: "/:catchAll(.*)",
        redirect: { name: RouterNames.ERROR }
    }
];

export { Routing }