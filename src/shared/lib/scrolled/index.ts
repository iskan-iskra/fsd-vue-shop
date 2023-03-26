import { ref } from "vue"


const isScrollBottom = ref(false)


const useScrolled = () => {
    const changedScrollBottom = (flag: boolean) => {
        isScrollBottom.value = flag
    }
    return {
        isScrollBottom,
        changedScrollBottom
    }
}

export default useScrolled