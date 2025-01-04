export default interface IMovement {
    id?: string,
    article_id?: number,
    quantity?: number
    movement_type_id?: number,
    movement_date?: string,
    reference?: string,
    created_at?: string,
    updated_at?: string,
    movement_type? : string | {
        id: string,
        name: string,
        description: string,
        created_at: string,
        updated_at: string
    },
    article?: {
        id: string,
        barcode: string,
        location: string,
        description: string,
        alert: number,
        expiration_date: string,
        quantity: number,
        purchase_price: number,
        selling_price: number,
        is_active: number,
        comment: string,
        row_id: string,
        created_at: string,
        updated_at: string,
        created_by: string,
        updated_by: string,
        currency_id: number,
        category_id: number,
        packaging_id: number,
        placements ? : [
            {
                id: string,
                name: string,
                row_id: string,
                created_at: string,
                updated_at: string,
            }
        ],
        suppliers ? : [
            {
                id: string,
                name: string,
                row_id: string,
                created_at: string,
                updated_at: string,
            }
        ]
    }

}