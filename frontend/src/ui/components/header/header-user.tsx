import {
  BarChart,
  Bell,
  LogOut,
  Settings,
  Shield,
  Upload,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useLogout } from "~/features/auth/hooks/auth.hooks";

import { cn } from "~/lib/cn";
import { Avatar, AvatarFallback, AvatarImage } from "~/ui/primitives/avatar";
import { Button } from "~/ui/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/ui/primitives/dropdown-menu";

interface HeaderUserDropdownProps {
  isDashboard: boolean;
  userEmail: string;
  userImage?: null | string;
  userName: string;
}

export function HeaderUserDropdown({
  isDashboard = false,
  userEmail,
  userImage,
  userName,
}: HeaderUserDropdownProps) {
  const logoutMutation = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="relative overflow-hidden rounded-full"
          size="icon"
          variant="ghost"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage
              alt={userName || "User"}
              src={userImage || undefined}
            />
            <AvatarFallback>
              {userName ? (
                userName
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .slice(0, 2)
              ) : (
                <UserIcon className="h-4 w-4" />
              )}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <Avatar className="h-8 w-8 bg-primary/10">
            <AvatarImage
              alt={userName || "User"}
              src={userImage || undefined}
            />
            <AvatarFallback>
              {userName ? (
                userName
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .slice(0, 2)
              ) : (
                <UserIcon className="h-4 w-4 text-primary" />
              )}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-0.5">
            <p className="text-sm font-medium">{userName || "User"}</p>
            <p
              className={"max-w-[160px] truncate text-xs text-muted-foreground"}
            >
              {userEmail}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href="/dashboard/profile">
            <UserIcon className="mr-2 h-4 w-4" />
            Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href="/dashboard/profile">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className={cn(
            "cursor-pointer",
            isDashboard
              ? "text-red-600"
              : `
                txt-destructive
                focus:text-destrctive
              `,
          )}
          onClick={() => { logoutMutation.mutateAsync() }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
