import type { Metadata } from "next";
import DarkModeToggle from "./components/DarkModeToggle";
// import localFont from "next/font/local";
// import { Nunito } from "next/font/google";
import "./globals.css";

import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./components/providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";
import ClientOnly from "./components/ClientOnly";
import { ReactNode } from "react";
import SessionProviderWrapper from "./components/SessionProviderWrapper";

// const font = Nunito({
//   subsets: ["latin"],
// });

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "PillowPod",
  description: "A platform for renting and listing properties",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <SessionProviderWrapper>
          <ClientOnly>
            <DarkModeToggle />
            <ToasterProvider />
            <SearchModal />
            <RegisterModal />
            <RentModal />
            <LoginModal />
            <Navbar currentUser={currentUser} />
          </ClientOnly>
          <div className="pb-20 pt-28">{children}</div>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
