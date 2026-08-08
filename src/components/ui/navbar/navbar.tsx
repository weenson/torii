"use client";

import { useEffect, useState } from "react";
import { User, Menu, LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "../SearchBar";
import { UserInfoType } from "@/types/anime";
import SideBar from "@/components/layout/sidebar";
import UserMenu from "./user-menu";
import NotificationMenu from "./notification-menu";

type NavBarProps = {
  overlay?: boolean;
  isLoggedIn?: boolean;
  userInfo?: UserInfoType["Viewer"] | null;
  unreadNotificationsCount?: number;
};

type openDropDownProps = "user" | "notifications" | null;

export default function NavBar({
  overlay,
  isLoggedIn,
  userInfo,
  unreadNotificationsCount,
}: NavBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropDown, setOpenDropDown] = useState<openDropDownProps>(null);
  const [notificationCount, setNotificationCount] = useState(
    unreadNotificationsCount ?? 0,
  );

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
              <div className="relative">
                {notificationCount > 0 && (
                  <span className="z-10 absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
                <NotificationMenu
                  isLoggedIn={isLoggedIn ?? false}
                  open={openDropDown === "notifications"}
                  onOpenChange={(open) =>
                    setOpenDropDown(open ? "notifications" : null)
                  }
                  onNotificationCountChange={(count) =>
                    setNotificationCount(count)
                  }
                />
              </div>

              {isLoggedIn && userInfo?.avatar?.medium ? (
                <UserMenu
                  name={userInfo.name}
                  avatar={userInfo.avatar?.medium}
                  open={openDropDown === "user"}
                  onOpenChange={(open) => setOpenDropDown(open ? "user" : null)}
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
        isLoggedIn={isLoggedIn ?? null}
      />
    </>
  );
}
