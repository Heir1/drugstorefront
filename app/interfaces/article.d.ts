// app/type/Article.ts

export default interface IArticle {

    id?: string,
    value?: string,
    label?: string,
    barcode?: string,
    description: string,
    alert: Number,
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
    // placement?: Array
    // indication?: Array,
    // molecule?: Array,
    // supplier?: Array,
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

    placements ? : Array | [
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

    molecules ? : Array | [
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

    suppliers ? : Array | [
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

    indications ? : Array | [
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