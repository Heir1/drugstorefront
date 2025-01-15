export default interface Iinvoice     {
    id?: number,
    invoice_id?: number,
    article_id?: number,
    quantity?: number,
    quantity1?: number,
    unit_price?: number,
    prix_total?: number,
    subtotal?: number,
    created_at?: string,
    updated_at?: string,
    invoices?: {
        id?: number,
        invoice_date?: string,
        invoice_number?: string,
        total_excl_tax?: number,
        vat?: number,
        total_incl_tax?: number,
        created_at?: string,
        updated_at?: string
    },
    articles?: [
        {
            id: string,
            quantity1: number,
            prix_total: number
        }   
        ] | {
            id?: number,
            barcode?: string,
            location?: string,
            description?: string,
            alert?: number,
            expiration_date?: string,
            quantity?: number,
            purchase_price?: number,
            selling_price?: number,
            is_active?: boolean,
            comment?: string,
            row_id?: string,
            created_at?: string,
            updated_at?: string,
            created_by?: string,
            updated_by?: string,
            currency_id?: number,
            category_id?: number,
            packaging_id?: number
        }
}