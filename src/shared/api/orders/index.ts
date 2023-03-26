import { fakeCreateOrder, fakeGetOrders } from "../fakeApi"
import { TCreateOrder, TOrder } from "shared/api"

const getOrders = async (): Promise<TOrder[] | void> => {
    try {
        const res = await fakeGetOrders()
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



const createOrder = async (params: TCreateOrder): Promise<TOrder[] | void> => {
    try {
        const res = await fakeCreateOrder(params);
        console.log(res);

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

export { getOrders, createOrder }