export interface UserRegistrationData {
    email: string;
    password1: string;
    password2: string;
}

export interface User {
    email: string;
    password: string;
    username: string;
}

export interface UserToken {
    key: string;
}