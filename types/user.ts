export interface User {
    id: string,
    name: string,
    age: number,
    role: Role,
    password: string
}

export enum Role {
    Admin = "Admin",
    User = "User"
}