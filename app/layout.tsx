import { ReactNode } from "react";
import DarkModeToggle from "./components/DarkModeToggle";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./components/providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";
import ClientOnly from "./components/ClientOnly";
import SessionProviderWrapper from "./components/SessionProviderWrapper";
import "./globals.css";

export const metadata = {
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
