type User = {
    idUser?: string,
    username?: string,
    password?: string
}

type UserLogin = {
    "error": boolean,
    "message"?: string,
    "token"?: string,
    "token_expired"?: boolean,
    "expired_date"?: string,
    "user"?: User
}

export type { UserLogin }