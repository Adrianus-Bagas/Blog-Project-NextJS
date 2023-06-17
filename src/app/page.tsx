"use client";

import { useLogin } from "@/service/auth/hooks";
import Image from "next/image";
import { FormEventHandler, useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = useLogin();
  const onLogin: FormEventHandler<HTMLFormElement> = (form) => {
    form.preventDefault();
    const formData = new FormData(form.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    if (typeof username === "string" && typeof password === "string") {
      login({
        username,
        password,
      });
    }
  };
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
