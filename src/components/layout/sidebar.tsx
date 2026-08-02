"use client";
import {
  ChevronLeft,
  Home,
  LayoutGrid,
  Users,
  Settings,
  Calendar,
  Heart,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function SideBar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const links = [
    {
      id: 1,
      group: [{ href: "/dashboard", label: "Home", icon: Home }],
    },
    {
      id: 2,
      group: [
        { href: "/browse", label: "Browse", icon: LayoutGrid },
        { href: "#", label: "Schedule", icon: Calendar },
        { href: "/profile", label: "Profile", icon: Users },
      ],
    },
    {
      id: 3,
      group: [{ href: "#", label: "Settings", icon: Settings }],
    },
  ];

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <>
      <div>
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-card transition-transform duration-300 ease-out
            ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <button
            className="absolute top-4 left-4 text-primary-text cursor-pointer"
            onClick={onClose}
          >
            <ChevronLeft />
          </button>
          <div className="h-full py-4 px-3 flex flex-col gap-6 text-muted-text font-bold text-sm">
            <div className="flex items-center gap-4 justify-center">
              <Image
                src="images/logo.svg"
                alt="logo"
                width={100}
                height={100}
              />
            </div>
            {links.map((link) => (
              <div key={link.id} className="flex flex-col gap-2">
                {link.group.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className={`group not-last:hover:bg-muted px-2 py-3 rounded-lg ${pathname === l.href ? "bg-muted" : ""}`}
                  >
                    <span
                      className={`flex items-center gap-6 text-muted-text group-hover:text-primary-text ${pathname === l.href ? "text-primary-text" : ""}`}
                    >
                      <l.icon />
                      {l.label}
                    </span>
                  </Link>
                ))}
                <hr className="border-muted" />
              </div>
            ))}
            <div className="mt-auto flex items-center justify-center">
              <p className="text-muted-text text-xs">
                Made with ❤️ by{" "}
                <Link
                  href="https://github.com/weenson"
                  target="_blank"
                  className="text-primary-text"
                >
                  weenson
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div
          className={`fixed inset-0 z-40 bg-background/80 backdrop-blur-md transition-opacity duration-300
            ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          onClick={onClose}
        ></div>
      </div>
    </>
  );
}
