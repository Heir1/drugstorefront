import IUser from "./user";

interface Currency {
    id?: string;
    name?: string;
    value?: number;
    symbol?: string;
    row_id?: string;
    created_at?: string;
    updated_at?: string;
    created_by?: string | null;
    updated_by?: string | null;
}

export default interface ITransaction {
    id?: number;
    transaction_type?: string;
    transaction_date?: string;
    ticket_counter?: IUser | string | number | null;
    amount?: number;
    description?: string;
    currency_id?: string;
    created_by?: IUser | string | number | null;
    updated_by?: IUser | string | number | null;
    created_at?: string;
    updated_at?: string;
    currency?: Currency;
}