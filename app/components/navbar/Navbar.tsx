"use client";

// import { User } from "@prisma/client";
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

// Navbar.tsx
const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <nav className="fixed w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 z-10 shadow-sm top-0">
      <div className="py-4 border-b-[1px] dark:border-gray-700">
        <Container>
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
