export default interface IUser {
    id?: number,
    name?: string,
    email?: string,
    password?:string,
    password_confirmation?:string,
    email_verified_at?: string,
    created_at?: string,
    updated_at?: string,
    role?: string,
    error?: string
}