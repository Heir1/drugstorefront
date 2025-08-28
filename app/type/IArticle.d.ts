// app/type/Article.ts

export default interface IArticle {

    id: number,
    barcode: string,
    description: string,
    alert: 1,
    expiration_date: string,
    quantity: number,
    purchase_price: number,
    selling_price: number,
    is_active: boolean,
    comment: string,
    row_id: string,
    created_at: string,
    updated_at: string,
    created_by: string,
    updated_by: string,
    currency_id: number,
    category_id: number,
    packaging_id: number,

    currency: {
        id: number,
        name: string,
        value: number,
        symbol: string,
        row_id: string,
        created_at: string,
        updated_at: string,
        created_by: string,
        updated_by: string
    },

    category: {
        id: number,
        name: string,
        row_id: string,
        created_at: string,
        updated_at: string,
        created_by: string,
        updated_by: string
    },

    packaging: {
        id: number,
        name: string,
        row_id: string,
        created_at: string,
        updated_at: string,
        created_by: string,
        updated_by: string
    },

    placements: [
        {
            id: number,
            name: string,
            row_id: string,
            created_at: string,
            updated_at: string,
            created_by: string,
            updated_by: string
        }
    ],

    molecules: [
        {
            id: number,
            name: string,
            row_id: string,
            created_at: string,
            updated_at: string,
            created_by: string,
            updated_by: string
        }
    ],

    suppliers: [
        {
            id: number,
            name: string,
            row_id: string,
            created_at: string,
            updated_at: string,
            created_by: string,
            updated_by: string
        }
    ],

    indications: [
        {
            id: number,
            name: string,
            row_id: string,
            created_at: string,
            updated_at: string,
            created_by: string,
            updated_by: string
        }
    ]

}