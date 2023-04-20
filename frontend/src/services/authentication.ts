const AUTH_TOKEN_KEY = "auth_token";

export function setAuthToken(token: string) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function removeAuthToken() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function getAuthToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
}