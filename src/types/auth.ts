export interface AuthUser {
    name: string
    email: string
}

export interface Session {
    user: AuthUser
    token: string
}