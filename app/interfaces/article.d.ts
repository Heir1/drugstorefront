// src/types.ts

export interface IArticle {
    id: string;
    currency : {
        currency_Id: string;
        name: string;
        value: number;
        symbol: string;
    }
    supplier : {
        supplier_id: string;
        name: string;
    }
    packaging : {
        packaging_id: string;
        name: string;
    }
    category : {
        category_id: string;
        name: string;
    }
    molecule : {
        molecule_id: string;
        name: string;
    }
    Indication : {
        Indication_id: string;
        name: string;
    }
    placement : {
        placement_id: string;
        name: string;
    }
    barcode: string;
    description: string;
    alert: number;
    expiration_date: string;
    quantity: string;
    purchase_price: number;
    selling_price: number;
    is_active: boolean;
    is_active_comment: string;
    row_id: string;
    created_at: string;
    updateded_at: string;
    created: string;
    updatededBy: string;
  }
  