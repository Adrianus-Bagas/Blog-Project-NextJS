import { axios } from "@/utils/axios";

export const getAllPosts = async () => {
    const res = await axios({
        method: "get",
        url: "/posts"
    })

    return res.data
}

export const getPostById = async (id: number) => {
    const res = await axios({
        method: "get",
        url: `/posts/${id}`
    })
    return res.data
}

export const getPostComment = async (id: number) => {
    const res = await axios({
        method: "get",
        url: `/posts/${id}/comments`
    })
    return res.data.comments
}