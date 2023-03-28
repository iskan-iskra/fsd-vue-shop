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

const __generateProductCategory = (maxAmountOfProduct: number, currentProductNumber: number) => {
    let generatedCategoryId = 1;
    if (currentProductNumber > Math.round(maxAmountOfProduct * 4 / 5) - 1) generatedCategoryId = 5
    else if (currentProductNumber > Math.round(maxAmountOfProduct * 3 / 5) - 1) generatedCategoryId = 4
    else if (currentProductNumber > Math.round(maxAmountOfProduct * 2 / 5) - 1) generatedCategoryId = 3
    else if (currentProductNumber > Math.round(maxAmountOfProduct / 5) - 1) generatedCategoryId = 2
    return generatedCategoryId
}


const __generateProductPrice = (currentCategoryId: number) => {
    return (Math.floor(Math.random() * 9) + 1) * 1000 * (currentCategoryId > 2 ? 100 : 1);
}

const __generateFirstPartOfName = (currentCategory: number): string => {
    switch (currentCategory) {
        case 1:
            return "мышка"
        case 2:
            return "клавиатура"
        case 3:
            return "монитор"
        case 4:
            return "видеокарта"
        case 5:
            return "процессор"
        default:
            return "товар"
    }
}

const __generateProductName = (currentCategory: number, currentProductNumber: number): string => {
    return __generateFirstPartOfName(currentCategory) + " " + (currentProductNumber + 1).toString()
}

const __generateProductAmount = () => {
    return (Math.floor(Math.random() * 3) + 1) * 10 + (Math.floor(Math.random() * 9))
}

const __genereProductList = (): TProduct[] => {
    const maxAmountOfProduct: number = 49
    const res: TProduct[] = []
    for (let i = 0; i < maxAmountOfProduct; i++) {
        const generatedCategoryId: number = __generateProductCategory(maxAmountOfProduct, i)
        const generatedPrice = __generateProductPrice(generatedCategoryId)
        const genaratedName = __generateProductName(generatedCategoryId, i)
        const gereratedAmount = __generateProductAmount()
        res.push({
            id: i,
            categoryId: generatedCategoryId,
            cost: generatedPrice,
            name: genaratedName,
            photo: "",
            orderAmount: 0,
            warehouseAmount: gereratedAmount,
        })
    }

    return res
}
export const __productList = __genereProductList()

export const __categoryList: TCategory[] = [
    {
        id: 1,
        name: "мышки",
        key: "mouse",
    },
    {
        id: 2,
        name: "клавиатуры",
        key: "keyboard",
    },
    {
        id: 3,
        name: "мониторы",
        key: "monitor",
    },
    {
        id: 4,
        name: "видеокарты",
        key: "GPU",
    },
    {
        id: 5,
        name: "процессоры",
        key: "CPU",
    },


]