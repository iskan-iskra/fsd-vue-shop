import { ref } from 'vue';
import { __categoryList, __productList, __orderList } from './fakeData'
import { TProduct, TOrder, TCategory } from 'shared/api';
import { fakeApiConfig } from './config';
// used one file for saving status of ref constants
// it is nessessory for connection between orders and products

type TStatus = "success" | "error"

type TRes = {
    data: any,
    status: TStatus,
    message?: string,
}



console.log("init fake API server");


const fakeProductList = ref<TProduct[]>([]);
const fakeOrderList = ref<TOrder[]>([]);
const fakeCategoryList = ref<TCategory[]>([])

if (__productList?.length > 0) {
    console.log("fake products data initiated", __productList.length
    );
    fakeProductList.value = __productList
}

if (__orderList.length > 0) {
    console.log("fake orders data initiated", __orderList.length);
    fakeOrderList.value = __orderList
}

if (__categoryList.length > 0) {
    console.log("fake categories data initiated", __categoryList.length);
    fakeCategoryList.value = __categoryList
}




const __getIndex = (id: number, array: Array<any>) => {

    const res = array.findIndex((el) => el?.id === id)
    if (res !== -1) {
        return res
    }
    return undefined
}

const __searchById = (id: number, array: Array<any>): any => {
    const res = array.find((el) => el?.id === id)
    if (res) {
        return res
    }
    return undefined
}

type TProductSort = "byAmountUp" | "byCostUp" | "byAmountDown" | "byCostDown"

type TGetProductList = {
    page: number,
    pageSize: number,
    category?: number,
    sort?: TProductSort
}

type TResProductList = {
    list: TProduct[],
    totalPages: number,
}

const fakeGetProductList = async (params: TGetProductList = {
    page: 1,
    pageSize: 5,
}): Promise<TRes> => {

    return new Promise<TRes>((resolve, regect) => setTimeout(() => {
        if (!fakeApiConfig.workStatus) {
            regect({
                data: undefined,
                status: "error"
            })
        }

        let reqProducts: TProduct[]

        if (params.category) {
            reqProducts = fakeProductList.value.filter((el) => el.categoryId === params.category)
        } else {
            reqProducts = fakeProductList.value
        }

        if (params.sort) {
            switch (params.sort) {
                case "byAmountUp":
                    reqProducts.sort((a, b) => a.warehouseAmount - b.warehouseAmount)
                    break;
                case "byCostUp":
                    reqProducts.sort((a, b) => a.cost - b.cost)
                    break;
                case "byAmountDown":
                    reqProducts.sort((a, b) => b.warehouseAmount - a.warehouseAmount)
                    break;
                case "byCostDown":
                    reqProducts.sort((a, b) => b.cost - a.cost)
                    break;
            }
        }

        let pagedList: TProduct[][] = []; //массив в который будет выведен результат.
        let totalPages = Math.ceil(reqProducts.length / params.pageSize)
        for (let i = 0; i < totalPages; i++) {
            pagedList[i] = reqProducts.slice((i * params.pageSize), (i * params.pageSize) + params.pageSize);
        }

        if (params.sort) {
            // restor sort
            reqProducts.sort((a, b) => a.id - b.id)
        }

        const result: TResProductList = {
            list: pagedList[params.page - 1],
            totalPages: totalPages + 1
        }
        if (result.list?.length > 0) {
            resolve({
                data: result,
                status: 'success'
            })
        } else {
            regect({
                data: undefined,
                status: 'error'
            })
        }
    }, fakeApiConfig.time));
}

const fakeGetProductById = async (id: number): Promise<TRes> => {

    return new Promise<TRes>((resolve, regect) => setTimeout(() => {
        if (!fakeApiConfig.workStatus) {
            regect({
                data: undefined,
                status: "error"
            })
        }
        const res: TProduct = __searchById(id, fakeProductList.value)
        if (res) {
            resolve({
                data: res,
                status: 'success'
            })
        } else {
            regect({
                data: undefined,
                status: 'error'
            })
        }
    }, fakeApiConfig.time));
}


const fakeGetProductListByIds = async (idList: number[]): Promise<TRes> => {
    return new Promise<TRes>((resolve, regect) => setTimeout(() => {
        if (!fakeApiConfig.workStatus) {
            regect({
                data: undefined,
                status: "error"
            })
        }
        const reqProductList: TProduct[] = []
        const notFoundIdList: number[] = []
        idList.forEach((id) => {
            const reqProduct = __searchById(id, fakeProductList.value)
            if (reqProduct) {
                reqProductList.push(reqProduct)
            } else {
                notFoundIdList.push(id)
            }
        })
        const res: TProduct[] = reqProductList
        if (res.length > 0) {
            resolve({
                data: res,
                status: 'success',
                message: notFoundIdList.length > 0 ? `Product with id: ${notFoundIdList.join(', ')} not found` : undefined
            })
        } else {
            regect({
                data: undefined,
                status: 'error'
            })
        }
    }, fakeApiConfig.time));
}

type TproductChangeAmountStatus = "success" | "not_found" | "amount_problem"

const __productCheckForChangeAmount = (id: number, amount: number): TproductChangeAmountStatus => {
    const resIndex = __getIndex(id, fakeProductList.value)
    if (resIndex) {
        if (fakeProductList.value[resIndex].warehouseAmount > amount) {
            return "success"
        } else {
            return "amount_problem"
        }
    } else {
        return "not_found"
    }
}

const __productChangeAmount = (id: number, amount: number) => {
    const resIndex = __getIndex(id, fakeProductList.value)
    if (resIndex) {
        if (fakeProductList.value[resIndex].warehouseAmount > amount) {
            fakeProductList.value[resIndex].warehouseAmount -= amount
            fakeProductList.value[resIndex].orderAmount += amount
        }
    }
}

const fakeGetOrders = async (): Promise<TRes> => {
    return new Promise<TRes>((resolve, regect) => setTimeout(() => {
        if (!fakeApiConfig.workStatus) {
            regect({
                data: undefined,
                status: "error"
            })
        }

        const res: TOrder[] = fakeOrderList.value
        if (res.length > 0) {
            resolve({
                data: res,
                status: 'success'
            })
        } else {
            regect({
                data: undefined,
                status: 'error'
            })
        }

    }, fakeApiConfig.time))
}

type TCreateOrder = Omit<TOrder, "id">

const fakeCreateOrder = async (params: TCreateOrder): Promise<TRes> => {
    return new Promise<TRes>((resolve, regect) => setTimeout(() => {
        if (!fakeApiConfig.workStatus) {
            regect({
                data: undefined,
                status: "error"
            })
        }

        if (!params.createdDate || params.productList.length === 0) {
            regect({
                data: undefined,
                status: "error"
            })
        }

        params.productList.forEach((el) => {
            const productCheck = __productCheckForChangeAmount(el.id, el.amount)
            switch (productCheck) {
                case "success":
                    break;
                case "amount_problem":
                    regect({
                        data: undefined,
                        status: "error",
                        message: "Amount of product on warehouse less than in order"
                    })
                    break;
                case "not_found":
                    regect({
                        data: undefined,
                        status: "error",
                        message: "Product not found pn warehouse"
                    })
                    break;
            }

        })

        params.productList.forEach((el) => {
            __productChangeAmount(el.id, el.amount)
        })

        const createdId = fakeOrderList.value.length + 1

        fakeOrderList.value.push({
            id: createdId,
            productList: params.productList,
            createdDate: params.createdDate
        })

        const requiredOrderIndex = __getIndex(createdId, fakeOrderList.value)

        const res = requiredOrderIndex ? fakeOrderList.value[requiredOrderIndex] : undefined

        if (res) {
            resolve({
                data: res,
                status: 'success'
            })
        } else {
            regect({
                data: undefined,
                status: 'error'
            })
        }
    }, fakeApiConfig.time))
}

const fakeGetCategoryList = async (): Promise<TRes> => {
    return new Promise<TRes>((resolve, regect) => setTimeout(() => {
        if (!fakeApiConfig.workStatus) {
            regect({
                data: undefined,
                status: "error"
            })
        }
        const res: TCategory[] = fakeCategoryList.value
        if (res.length > 0) {
            resolve({
                data: res,
                status: 'success'
            })
        } else {
            regect({
                data: undefined,
                status: 'error'
            })
        }
    }, fakeApiConfig.time));
}



export {
    fakeGetProductList,
    fakeGetProductById,
    fakeGetOrders,
    fakeCreateOrder,
    fakeGetCategoryList,
    fakeGetProductListByIds,
}


