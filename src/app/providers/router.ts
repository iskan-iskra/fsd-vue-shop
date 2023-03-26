import { createRouter, createWebHistory } from 'vue-router';
import { routes } from 'pages';
import { useGlobalLoader } from 'widgets/loader';
const { setLoading } = useGlobalLoader()

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    setLoading(false)
    next()
})