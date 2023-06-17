import { LoginBodyInterface, LoginInterface } from "@/interface";
import { LoginService } from "@/service/auth/fetcher";
import { getAllPosts } from "@/service/posts/fetcher";
import { getAllUsers } from "@/service/users/fetcher";
import { atom } from "jotai";
import { atomsWithMutation, atomsWithQuery } from "jotai-tanstack-query";

const initAuthState: LoginInterface = {
    token: "",
    isAuthenticated: false,
    id: 0,
    username: "",
    firstname: ""
}

export const isLoading = atom<boolean>(false)
export const authAtom = atom(initAuthState)

// export const [loginAuth] = atomsWithMutation(() => ({
//     mutationKey: ["Auth Login"],
//     mutationFn: async (body: LoginBodyInterface) => {
//         const data = await LoginService(body)
//         return data
//     }
// }))

export const [postsDataAtom] = atomsWithQuery(() => ({
    queryKey: ['posts-data'],
    queryFn: async () => {
        const data = await getAllPosts()
        return data.posts
    },
    retry: 2
}))

export const [usersDataAtom] = atomsWithQuery(() => ({
    queryKey: ['users-data'],
    queryFn: async () => {
        const data = await getAllUsers()
        return data.users
    },
    retry: 2
}))