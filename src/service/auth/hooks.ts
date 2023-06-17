"use client";

import { LoginBodyInterface } from "@/interface";
import { authAtom } from "@/store/app.atom";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { LoginService } from "./fetcher";

export const useLogin = () => {

    const [_, setAuthState] = useAtom(authAtom)
    const router = useRouter()
    const { mutate } = useMutation(
        (body: LoginBodyInterface) => LoginService(body),
        {
            onSuccess: (res) => {
                setAuthState({
                    token: res.token,
                    isAuthenticated: true,
                    id: res.id,
                    username: res.username,
                    firstname: res.firstName
                })
                router.push("/home")
            },
            onError: (error) => {
                console.log(error)
            }
        }
    )
    return mutate
}