"use client";

import { useEffect, useState } from "react";
import { User, Bell, Menu, LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "../SearchBar";
import { UserInfoType } from "@/types/anime";
import SideBar from "@/components/layout/sidebar";

type NavBarProps = {
  overlay?: boolean;
  isLoggedIn?: boolean;
  userInfo?: UserInfoType["Viewer"] | null;
};

export default function NavBar({ overlay, isLoggedIn, userInfo }: NavBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`z-30 transition-colors duration-300 fixed inset-x-0 top-0 ${
          overlay ? "fixed inset-x-0 top-0" : "sticky top-0"
        } ${
          isScrolled || !overlay
            ? "bg-background/50 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center py-3 px-4">
          <ul className="text-primary-text flex w-full items-center justify-between">
            <li className="flex items-center gap-4">
              <button
                className="cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu />
              </button>
              <Link href="/dashboard">
                <Image
                  src="/images/logo.svg"
                  alt="Torii"
                  className="cursor-pointer"
                  width={92}
                  height={92}
                />
              </Link>
            </li>
            <li>
              <SearchBar />
            </li>
            <li className="flex items-center gap-4">
              <button>
                <Bell />
              </button>

              {isLoggedIn && userInfo?.avatar?.medium ? (
                <Image
                  src={userInfo.avatar.medium}
                  alt={userInfo.name}
                  width={40}
                  height={40}
                  className="rounded-full bg-muted-text"
                />
              ) : isLoggedIn ? (
                <User />
              ) : (
                <button>
                  <Link href="/auth/login">
                    <span className="flex items-center gap-2 text-primary-text bg-primary px-4 py-2 font-bold text-sm rounded-md hover:bg-dark-red transition-colors duration-300">
                      <LogIn />
                      Sign in
                    </span>
                  </Link>
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <SideBar
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        username={userInfo?.name ?? null}
      />
    </>
  );
}
