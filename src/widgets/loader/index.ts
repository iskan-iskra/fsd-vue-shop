import { ref } from "vue"
import Loader from "./ui"
export default Loader

const isLoading = ref<Boolean>(false)

export const useGlobalLoader = () => {
    const setLoading = (flag: boolean) => {
        isLoading.value = flag

    }

    return {
        isLoading,
        setLoading,
    }
}