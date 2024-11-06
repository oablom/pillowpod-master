import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import Modal from "./components/modals/Modal";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./components/providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";
// import { Toaster } from "react-hot-toast";
import ClientOnly from "./components/ClientOnly";
const font = Nunito({
  subsets: ["latin"],
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AirBnB",
  description: "An enhanced AirBnB experience",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          {/* <Modal isOpen={true} actionLabel="Submit" /> */}
          {/* <ToasterProvider /> */}
          <ToasterProvider />
          <SearchModal />
          <RegisterModal />
          <RentModal />
          <LoginModal />
          <Navbar currentUser={currentUser}></Navbar>
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
