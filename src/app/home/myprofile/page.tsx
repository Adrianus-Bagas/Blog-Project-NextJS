"use client";

import ProfileCard from "@/components/ProfileCard";
import { useGetUserById } from "@/service/users/hooks";
import { authAtom } from "@/store/app.atom";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MyProfile() {

  const ID = Cookies.get("ID");

  const [authState, setAuthState] = useAtom(authAtom);
  const { data, isLoading } = useGetUserById(parseInt(ID!));
  const [hiddenGeneral, setHiddenGeneral] = useState<string>("display");
  const [hiddenAddress, setHiddenAddress] = useState<string>("hidden");
  const [hiddenJob, setHiddenJob] = useState<string>("hidden");
  const router = useRouter();

  const changeProfileContent = (menu: string) => {
    if (menu === "general") {
      setHiddenGeneral("display");
      setHiddenAddress("hidden");
      setHiddenJob("hidden");
    } else if (menu === "address") {
      setHiddenGeneral("hidden");
      setHiddenAddress("display");
      setHiddenJob("hidden");
    } else {
      setHiddenGeneral("hidden");
      setHiddenAddress("hidden");
      setHiddenJob("display");
    }
  };

  const handleLogout = () => {
    setAuthState({
      token: "",
      isAuthenticated: false,
      id: 0,
      username: "",
      firstname: "",
    });
    router.push("/");
  };

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <div className="p-4 h-full grid content-center">
        <div className="p-4 m-4 border-2 border-white rounded-lg dark:border-gray-700">
          <div className="bg-yellow-100 p-2">
            <h1 className="text-center text-5xl font-bold">My Profile</h1>
          </div>
          <div className="p-2 md:flex md:justify-center md:items-center">
            <ul className="menu menu-horizontal flex justify-center md:menu-vertical bg-yellow-100 rounded-md mx-auto">
              <li onClick={() => changeProfileContent("general")}>
                <a>General</a>
              </li>
              <li onClick={() => changeProfileContent("address")}>
                <a>Address</a>
              </li>
              <li onClick={() => changeProfileContent("job")}>
                <a>Job</a>
              </li>
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </ul>
            <div className="mx-auto">
              <ProfileCard
                hidden={hiddenGeneral}
                image={data?.image}
                title={"General"}
                detail={`Hi everyone, my name is ${
                  data?.firstName +
                  " " +
                  data?.lastName +
                  " " +
                  data?.maidenName
                }. I am a ${data?.age} years old ${data?.gender} with ${
                  data?.hair.color + " " + data?.hair.type
                } hair and ${
                  data?.eyeColor
                } eye color. Feel free to reach me out by email (${
                  data?.email
                }) or regular text (${data?.phone}).`}
              />
              <ProfileCard
                hidden={hiddenAddress}
                image={"/address.jpg"}
                title={"Address"}
                detail={`I live in ${
                  data?.address.address +
                  ", " +
                  data?.address.city +
                  ", " +
                  data?.address.state
                } and i graduated from ${
                  data?.university
                }. If you want to send something for me, here's my postal code : ${
                  data?.address.postalCode
                }`}
              />
              <ProfileCard
                hidden={hiddenJob}
                image={"/job.jpg"}
                title={"Job"}
                detail={`Until this day, i work as ${
                  data?.company.title
                } under ${data?.company.department} department at ${
                  data?.company.name
                } in ${
                  data?.company.address.address +
                  ", " +
                  data?.company.address.city +
                  ", " +
                  data?.company.address.state
                }.`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
