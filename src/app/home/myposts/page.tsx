"use client";

import Card from "@/components/Card";
import { useGetUserPost } from "@/service/users/hooks";
import { authAtom } from "@/store/app.atom";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function PostPage() {

  const ID = Cookies.get("ID")
  const [authState] = useAtom(authAtom);
  const { data, isLoading, isFetching } = useGetUserPost(parseInt(ID!));
  const [page, setPage] = useState<number>(1);
  const [userPost, setUserPost] = useState([]);
  const [isDisabledNext, setIsDisabledNext] = useState<boolean>(false);
  const [isDisabledPrev, setIsDisabledPrev] = useState<boolean>(false);
  const limit = 3;

  useEffect(() => {
    setUserPost(data?.slice((page - 1) * limit, limit * page));
    if (page === 1) {
      setIsDisabledPrev(true);
      setIsDisabledNext(false);
    } else if (page === data?.length / limit) {
      setIsDisabledPrev(false);
      setIsDisabledNext(true);
    } else {
      setIsDisabledPrev(false);
      setIsDisabledNext(false);
    }
  }, [page, data]);

  const pagination = (sign: string) => {
    if (sign === "next") {
      page < data?.length / limit ? setPage(page + 1) : setPage(page);
    } else {
      page > 1 ? setPage(page - 1) : setPage(page);
    }
  };

  return isLoading || isFetching ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <div className="h-screen">
        <div className="p-4">
          <div className="p-4 m-4 border-2 border-white rounded-lg dark:border-gray-700">
            <div className="bg-yellow-100 p-2">
              <h1 className="text-center text-5xl font-bold">My Posts</h1>
            </div>
            <div className="md:flex md:justify-center md:flex-wrap">
              {userPost?.map((post: any) => (
                <Card
                  key={post.id}
                  title={post.title}
                  detail="Click button below for more"
                  route={"modal"}
                  postData={post}
                  idModal={`post-${post.id}`}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <button
                disabled={isDisabledPrev}
                onClick={() => pagination("prev")}
                className="btn bg-yellow-100 text-black mx-2"
              >
                Prev
              </button>
              <button
                disabled={isDisabledNext}
                onClick={() => pagination("next")}
                className="btn bg-yellow-100 text-black mx-2"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
