"use client";

import { useEffect, useState } from 'react';
import { User, Bell, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from './SearchBar';

type NavBarProps = {  
  overlay?: boolean;
}

export default function NavBar({ overlay }: NavBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, {passive: true});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`z-50 transition-colors duration-300 fixed inset-x-0 top-0 ${
        overlay
          ? "fixed inset-x-0 top-0"
          : "sticky top-0"
      } ${
        isScrolled || !overlay
          ? "bg-background/50 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center py-3 px-4">
          <ul className="text-primary-text flex w-full items-center justify-between">
            <li className="flex items-center gap-4">
              <button>
                <Menu/>
              </button>
              <Link href="/dashboard">
                <Image src="/images/logo.svg" alt="Torii" className="cursor-pointer" width={92} height={92} />
              </Link>
            </li>
            <li>
              <SearchBar />
            </li>
            <li className="flex items-center gap-4">
              <button>
                <Bell/>
              </button>
              <button>
                <User/>
              </button>
            </li>
          </ul>
        </div>
    </nav>
  );
}