import { productService, TCategory } from "shared/api";
import { ref } from "vue";

const categoryList = ref<TCategory[]>([])

const __getCategoryFromBack = async () => {

    try {
        const res = await productService.getAllCaregoryList()
        if (res && res.length > 0) categoryList.value = res
    } catch (error) {
        console.log(error);
    }
}

if (categoryList.value.length === 0) {
    await __getCategoryFromBack()
}


const useCategory = () => {

    const getCategoryByKey = (params: TCategory["key"] | undefined) => {
        if (params) return categoryList.value.find((el) => el.key === params)
        return
    }

    const getCategoryById = (params: TCategory["id"] | undefined) => {
        if (params) return categoryList.value.find((el) => el.id === params)
        return
    }

    const getCategoryByName = (params: TCategory['name'] | undefined) => {
        if (params) return categoryList.value.find((el) => el.name === params)
        return
    }

    return {
        getCategoryById,
        getCategoryByKey,
        getCategoryByName,
        categoryList
    }
}


export default useCategory