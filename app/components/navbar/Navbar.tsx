"use client";

import { useSession } from "next-auth/react";
import { SafeUser } from "@/app/types";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import React from "react";
import Categories from "./Categories";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const { data: session } = useSession();

  return (
    <nav className="fixed w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 z-10 shadow-sm top-0">
      <div className="py-4 border-b-[1px] dark:border-gray-700">
        <Container>
          <div className="absolute top-0 right-10 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-0.5 rounded-md shadow-sm z-100 border border-gray-300 dark:border-gray-700">
            {session ? (
              <div className="flex flex-col text-xs">
                <span>
                  Logged in as <strong>{session.user?.name}</strong>
                </span>
                {currentUser?.isAdmin && (
                  <span className="text-green-700 dark:text-green-400">
                    with admin authority
                  </span>
                )}
              </div>
            ) : (
              <span className="text-xs">Not logged in</span>
            )}
          </div>

          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </nav>
  );
};

export default Navbar;
