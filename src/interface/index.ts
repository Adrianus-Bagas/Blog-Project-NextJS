export interface LoginInterface {
    token: string,
    isAuthenticated: boolean,
    id: number,
    username: string,
    firstname: string
}

export interface LoginBodyInterface {
    username: string,
    password: string
}

export interface ApiConfig {
    url: string,
}