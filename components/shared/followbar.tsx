"use client"

import React from "react";
import Button from "../ui/button";
import { Loader2 } from "lucide-react";
import User from "./user";
import useUsers from "@/hooks/useUser";
import { IUser } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FollowBar() {
  const { isLoading, users } = useUsers(5);
  const router = useRouter()

  const goToExplore = async () => {
    router.push('/explore')
  }

  return (
    <div className="py-4 hidden lg:block w-[266px]">
      <div className="bg-neutral-800 rounded-xl">
        <div className="flex items-center justify-between px-4 pt-4">
          <h2 className="text-white text-xl font-semibold">Who to follow</h2>
          <Button
            secondary
            label={"See all"}
            classNames="h-[30px] p-0 w-fit px-3 text-sm"
            onClick={goToExplore}
          />
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-24">
            <Loader2 className="animate-spin text-sky-500" />
          </div>
        ) : (
          <div className="flex flex-col mt-4">
            {users.map((user: IUser) => (
              <Link key={user._id} href={`/profile/${user._id}`}>
                <User user={user} /> 
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
