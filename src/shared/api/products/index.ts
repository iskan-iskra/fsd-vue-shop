import { TProduct, TCategory, TProductSort } from "shared/api/"
import { fakeGetProductList, fakeGetProductById, fakeGetCategoryList } from "../fakeApi"



type TStatus = "success" | "error"

type TListParams = {
    page: number,
    pageSize: number,
    category?: number,
    sort?: TProductSort
}

const getProductById = async (id: TProduct['id']): Promise<TProduct | void> => {
    try {
        const res = await fakeGetProductById(id)
        if (res.status === "success") {
            return res.data
        }
        if (res.status === "error") {
            new Error('Server error')
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}


type TGetProductsList = {
    data: {
        list: TProduct[],
        totalPages: number,
    },
    status: TStatus,
    message?: string,
}

const getProductsList = async (params: TListParams = {
    page: 1,
    pageSize: 10,
}): Promise<TGetProductsList["data"] | undefined> => {
    try {
        const res: TGetProductsList = await fakeGetProductList(params)

        if (res.status === "success") {
            return res.data
        }
        if (res.status === "error") {
            new Error('Server error')
        }
    } catch (error: any) {
        console.log(error);
        throw error
    }
}

const test = async (id: number): Promise<void> => {
    console.log("test API");
}




// dublicate API for option, when productslist by category
// use API of category (not products api)
const getProductsByCategory = async (params: TListParams = {
    page: 1,
    pageSize: 10,
}): Promise<TGetProductsList["data"] | undefined> => {
    try {
        const res: TGetProductsList = await fakeGetProductList(params)

        if (res.status === "success") {
            return res.data
        }
        if (res.status === "error") {
            new Error('Server error')
        }
    } catch (error: any) {
        console.log(error);
        throw error
    }
}

type TGetCategoryList = {
    data: TCategory[],
    status: TStatus,
    message?: string,
}

const getAllCaregoryList = async (): Promise<TCategory[] | void> => {
    try {
        const res: TGetCategoryList = await fakeGetCategoryList()
        if (res.status === "success") {
            return res.data
        }
        if (res.status === "error") {
            new Error('Server error')
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}

export {
    getProductById,
    getProductsList,
    getProductsByCategory,
    getAllCaregoryList,
    test,
}
