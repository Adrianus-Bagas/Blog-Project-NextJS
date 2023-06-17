"use client";

import Card from "@/components/Card";
import { authAtom } from "@/store/app.atom";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  const [authState] = useAtom(authAtom);
  const [greet, setGreet] = useState<string>("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour > 17) {
      setGreet("Good Evening");
    } else if (hour > 10) {
      setGreet("Good Afternoon");
    } else if (hour > 6) {
      setGreet("Good Morning");
    } else {
      setGreet("It's Sleep Time");
    }
  }, []);

  return (
    <>
      <div className="h-screen">
        <div className="p-4">
          <div className="p-4 m-4 border-2 border-white rounded-lg dark:border-gray-700">
            <div className="bg-yellow-100 p-2">
              <h1 className="text-center text-5xl font-bold">
                {greet} {authState.firstname}
              </h1>
            </div>
            <div className="md:flex md:flex-wrap md:justify-center">
              <Card
                title="My Posts"
                detail="View all my posts and see other users' reactions"
                route=""
              />
              <Card
                title="My Profile"
                detail="You can view my profile and reach me out by contact"
                route=""
              />
                <Card
                  title="All Posts"
                  detail="View all posts in this blog and see the reactions"
                  route=""
                />
              <Card
                title="All Users"
                detail="View all users and reach them out by contact"
                route=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
