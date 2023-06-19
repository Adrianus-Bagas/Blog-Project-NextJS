import { LoginBodyInterface } from "@/interface";
import { axios } from "@/utils/axios";

export const LoginService = async (body: LoginBodyInterface) => {
    const result = await axios({
        method: "post",
        url: "/auth/login",
        data: body
    })
    return result.data
}