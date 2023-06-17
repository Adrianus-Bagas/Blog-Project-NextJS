import { axios } from "@/utils/axios";

export const getAllUsers = async () => {
    const res = await axios({
        method: "get",
        url: "/users"
    })
    return res.data
}

export const getUserById = async (id: number) => {
    const res = await axios({
        method: "get",
        url: `/users/${id}`
    })
    return res.data
}

export const getUserPost = async (id: number) => {
    const res = await axios({
        method: "get",
        url: `/users/${id}/posts`
    })
    return res.data.posts
}