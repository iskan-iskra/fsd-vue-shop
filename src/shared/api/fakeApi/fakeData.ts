import { TProduct, TCategory, TOrder } from "shared/api/"

const now = new Date()

export const __orderList: TOrder[] = [
    {
        id: 1,
        createdDate: now, productList: [
            {
                id: 1,
                amount: 1,
            },
            {
                id: 2,
                amount: 2,
            },
            {
                id: 3,
                amount: 3,
            }
        ]
    },
]



const __genereProductList = (): TProduct[] => {
    const res: TProduct[] = []
    for (let i = 0; i < 20; i++) {
        let reqcategoryId = 1;
        if (i > 3) reqcategoryId = 2
        if (i > 7) reqcategoryId = 3
        if (i > 11) reqcategoryId = 4
        if (i > 15) reqcategoryId = 5
        res.push({
            id: i,
            categoryId: reqcategoryId,
            cost: 10000,
            name: "test" + i,
            photo: "",
            orderAmount: 0,
            warehouseAmount: 10,
        })
    }

    return res
}
export const __productList = __genereProductList()

// export const __productList: TProduct[] = [
//     {
//         id: 1,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""

//     },
//     {
//         id: 2,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""
//     },
//     {
//         id: 3,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""
//     },
//     {
//         id: 4,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""

//     },
//     {
//         id: 5,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""
//     },
//     {
//         id: 6,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""
//     },
//     {
//         id: 1,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""

//     },
//     {
//         id: 7,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""
//     },
//     {
//         id: 8,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""
//     },
//     {
//         id: 9,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""

//     },
//     {
//         id: 10,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""
//     },
//     {
//         id: 11,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""
//     },
//     {
//         id: 12,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""

//     },
//     {
//         id: 13,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""
//     },
//     {
//         id: 14,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""
//     },
//     {
//         id: 15,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""

//     },
//     {
//         id: 16,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""
//     },
//     {
//         id: 17,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""
//     },
//     {
//         id: 18,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""

//     },
//     {
//         id: 19,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""
//     },
//     {
//         id: 20,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""
//     },
//     {
//         id: 21,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""

//     },
//     {
//         id: 22,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""
//     },
//     {
//         id: 23,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""
//     },
//     {
//         id: 24,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""

//     },
//     {
//         id: 25,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""
//     },
//     {
//         id: 26,
//         categoryId: 1,
//         cost: 100000,
//         name: "",
//         orderAmount: 0,
//         warehouseAmount: 10,
//         photo: ""
//     },
// ]

export const __categoryList: TCategory[] = [
    {
        id: 1,
        name: "мышки",
        key: "mouse",
    },
    {
        id: 2,
        name: "видеокарты",
        key: "GPU",
    },
    {
        id: 3,
        name: "мониторы",
        key: "monitor",
    },
    {
        id: 4,
        name: "процессоры",
        key: "CPU",
    },
    {
        id: 5,
        name: "клавиатуры",
        key: "keyboard",
    },

]