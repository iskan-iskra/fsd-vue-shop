export type TProduct = {
    id: number;
    name: string;
    categoryId: TCategory['id'];
    photo: string;
    cost: number;
    orderAmount: number;
    warehouseAmount: number;
}

export type TCategory = {
    id: number;
    name: string;
    key: string;
}

export type TOrder = {
    id: number;
    createdDate: Date;
    productList: TOrderProduct[];
}
type TOrderProduct = {
    id: number,
    amount: number
}

export type TCreateOrder = Omit<TOrder, "id">

export type TProductSort = "byAmountUp" | "byCostUp" | "byAmountDown" | "byCostDown"
