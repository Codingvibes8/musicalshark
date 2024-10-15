"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";

import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import AuthModal from "@/components/AuthModal";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const authModal = useAuthModal();
  const router = useRouter();
  return (
    <>
      <div
        className={twMerge(
          "p-6 bg-gradient-to-b from-indigo-800 h-fit",
          className
        )}
      >
        <div className={"flex flex-col items-center justify-center w-full"}>
          <h1 className={'text-yellow-400 text-3xl mb-2 font-bold'}>MusicalSharks</h1>
          <p className={"flex items-center justify-center text-sm text-blue-300"}>
            Music App For All Moods 12
          </p>
        </div>
        <div className="w-full mb-4 flex items-center justify-between">
          <div className="hidden md:flex gap-x-2 items-center">
            <button
              onClick={() => router.back()}
              className="transition hover:opacity-75 cursor-pointer rounded-full bg-black flex justify-center items-center"
            >
              <RxCaretLeft className="text-white" size={35} />
            </button>
            <button
              onClick={() => router.forward()}
              className="transition hover:opacity-75 cursor-pointer rounded-full bg-black flex justify-center items-center"
            >
              <RxCaretRight className="text-white" size={35} />
            </button>
          </div>
          <div className="flex md:hidden gap-x-2 items-center">
            <button
              onClick={() => router.push("/")}
              className="cursor-pointer bg-white transition hover:opacity-75 items-center justify-center rounded-full flex p-2"
            >
              <HiHome className="text-black" size={20} />
            </button>

            <button
              onClick={() => router.push("/search")}
              className="cursor-pointer bg-white transition hover:opacity-75 items-center justify-center rounded-full flex p-2"
            >
              <BiSearch className="text-black" size={20} />
            </button>
          </div>

          <div className="flex justify-between items-center gap-x-4">
            <div className="flex gap-x-4 items-center">
              <Button
                onClick={() => router.push("/account")}
                className="bg-white px-6 py-2"
              >
                <FaUserAlt />
              </Button>
            </div>

            <>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-blue-600 text-neutral-300 font-medium"
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-yellow-400 px-6 py-2"
                >
                  Log in
                </Button>
              </div>
            </>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Header;
