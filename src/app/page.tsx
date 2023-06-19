"use client";

import { useLogin } from "@/service/auth/hooks";
import { authAtom } from "@/store/app.atom";
import { useAtom } from "jotai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [auth, setAuth] = useAtom(authAtom);
  const router = useRouter();

  const login = useLogin();

  const onLogin = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (username && password) {
        login(
          { username, password },
          {
            onSuccess: (data) => {
              setAuth({
                id: data.id,
                token: data.token,
                isAuthenticated: true,
                username: data.username,
                firstname: data.firstName,
              });
              Cookies.set("ID", data.id.toString());
              router.push("/home");
            },
          }
        );
      }
    },
    [username, password, login]
  );
  return (
    <>
      <div className="h-screen">
        <div className="h-full grid place-content-center">
          <div className="mx-auto w-full bg-yellow-300 p-3 text-center">
            <h1 className="text-5xl font-bold">The Blog</h1>
          </div>
          <div className="flex bg-yellow-100 p-3 items-center justify-center lg:justify-center">
            <div className="shrink-1 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
              <Image
                src="/blog-login.jpg"
                width={200}
                height={200}
                alt="The Blog"
              />
            </div>

            <div className="md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
              <form onSubmit={onLogin}>
                <div className="p-2">
                  <input
                    type="text"
                    placeholder="Username"
                    className="input input-bordered input-sm w-full max-w-xs"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    name="username"
                  />
                </div>

                <div className="p-2">
                  <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered input-sm w-full max-w-xs"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    name="password"
                  />
                </div>

                <div className="p-2 text-center lg:text-left">
                  <button className="px-6 py-2.5 bg-yellow-400 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-300 hover:shadow-lg transition duration-150 ease-in-out">
                    Masuk
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
