"use client"

import { useQuery } from "@tanstack/react-query"
import { getUserById, getUserPost } from "./fetcher"

export const useGetUserById = (id: number) => {
    const { isLoading, data, error, isFetching } = useQuery({
        queryKey: ['user-by-id', id],
        queryFn: () => getUserById(id),
        retry: 2
    })
    return { isLoading, data, error, isFetching }
}

export const useGetUserPost = (id: number) => {
    const { isLoading, data, error, isFetching } = useQuery({
        queryKey: ['user-post', id],
        queryFn: () => getUserPost(id),
        retry: 2
    })

    return { isLoading, data, error, isFetching }
}