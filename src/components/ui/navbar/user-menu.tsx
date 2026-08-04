import Dropdown from "../dropdown";
import Image from "next/image";
import Link from "next/link";
import { User, LogOut } from "lucide-react";

type UserMenuProps = {
  name: string;
  avatar: string;
};
export default function UserMenu({ name, avatar }: UserMenuProps) {
  return (
    <Dropdown
      trigger={
        <Image
          src={avatar}
          alt={name}
          width={40}
          height={40}
          className="rounded-full"
        />
      }
      width="min-w-56"
    >
      <Link
        href={`/profile/${name}`}
        className="block rounded-md px-3 py-2 text-sm text-primary-text hover:bg-muted"
      >
        <span className="flex items-center">
          <User className="mr-2 h-4 w-4" />
          Profile
        </span>
      </Link>
      <a
        href="/api/auth/logout"
        type="button"
        className="block w-full rounded-md px-3 py-2 text-left text-sm text-primary-text hover:bg-muted"
      >
        <span className="flex items-center text-primary">
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </span>
      </a>
    </Dropdown>
  );
}
