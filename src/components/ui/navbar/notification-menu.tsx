import { Bell } from "lucide-react";
import Dropdown from "../dropdown";

export default function NotificationMenu({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  if (!isLoggedIn) {
    return (
      <Dropdown trigger={<Bell className="h-6 w-6" />} width="min-w-72">
        <div className="flex items-center justify-between text-sm font-bold mb-4">
          Notifications
        </div>
        <div className="flex flex-col items-center text-center justify-between text-sm font-bold gap-2 py-4">
          <Bell className="h-10 w-10 text-muted-text" />
          <p className="text-muted-text text-sm font-bold">
            Login to see your notifications
          </p>
          <p className="text-muted-text text-xs">
            Sign in to receive updates about your comments or interactions.
          </p>
        </div>
      </Dropdown>
    );
  }

  return (
    <Dropdown trigger={<Bell className="h-6 w-6" />}>
      <div className="flex items-center justify-between text-sm font-bold">
        Notifications
      </div>
    </Dropdown>
  );
}
