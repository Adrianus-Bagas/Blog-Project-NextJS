"use client";

import { LoginBodyInterface } from "@/interface";
import { useMutation } from "@tanstack/react-query";
import { LoginService } from "./fetcher";

export const useLogin = () => {
  const { mutate } = useMutation((body: LoginBodyInterface) =>
    LoginService(body)
  );
  return mutate;
};
