"use client";

import Card from "@/components/Card";
import { postsDataAtom } from "@/store/app.atom";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useState } from "react";

export default function PostPage() {
  const [postsData] = useAtom(postsDataAtom);
  const [data, setData] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [isDisabledNext, setIsDisabledNext] = useState<boolean>(false);
  const [isDisabledPrev, setIsDisabledPrev] = useState<boolean>(false);
  const limit = 3;

  useEffect(() => {
    setData(postsData.slice((page - 1) * limit, limit * page));
    if (page === 1) {
      setIsDisabledPrev(true);
      setIsDisabledNext(false);
    } else if (page === postsData.length / limit) {
      setIsDisabledPrev(false);
      setIsDisabledNext(true);
    } else {
      setIsDisabledPrev(false);
      setIsDisabledNext(false);
    }
  }, [page]);

  const pagination = (sign: string) => {
    if (sign === "next") {
      page < postsData.length / limit ? setPage(page + 1) : setPage(page);
    } else {
      page > 1 ? setPage(page - 1) : setPage(page);
    }
  };
  return (
    <>
      <div className="h-screen">
        <div className="p-4">
          <div className="p-4 m-4 border-2 border-white rounded-lg dark:border-gray-700">
            <div className="bg-yellow-100 p-2">
              <h1 className="text-center text-5xl font-bold">All Posts</h1>
            </div>
            <div className="md:flex md:justify-center md:flex-wrap">
              {data.map((post: any) => (
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
