// app/type/Article.ts

export default interface IArticle {

    id?: string,
    barcode?: string,
    description: string,
    alert: boolean,
    expiration_date: string,
    quantity: number,
    purchase_price: number,
    selling_price: number,
    is_active?: boolean,
    comment?: string,
    row_id?: string,
    created_at?: string,
    updated_at?: string,
    created_by?: string,
    updated_by?: string,
    currency_id?: number,
    category_id?: number,
    packaging_id?: number,

    currency ? : {
        id: string,
        name: string,
        value: number,
        symbol: string,
        row_id: string,
        created_at: string,
        updated_at: string,
        created_by: string,
        updated_by: string
    },

    category ? : {
        id: string,
        name: string,
        row_id: string,
        created_at: string,
        updated_at: string,
        created_by: string,
        updated_by: string
    },

    packaging ? : {
        id: string,
        name: string,
        row_id: string,
        created_at: string,
        updated_at: string,
        created_by: string,
        updated_by: string
    },

    placements ? : [
        {
            id: string,
            name: string,
            row_id: string,
            created_at: string,
            updated_at: string,
            created_by: string,
            updated_by: string
        }
    ],

    molecules ? : [
        {
            id: string,
            name: string,
            row_id: string,
            created_at: string,
            updated_at: string,
            created_by: string,
            updated_by: string
        }
    ],

    suppliers ? : [
        {
            id: string,
            name: string,
            row_id: string,
            created_at: string,
            updated_at: string,
            created_by: string,
            updated_by: string
        }
    ],

    indications ? : [
        {
            id: string,
            name: string,
            row_id: string,
            created_at: string,
            updated_at: string,
            created_by: string,
            updated_by: string
        }
    ]

}