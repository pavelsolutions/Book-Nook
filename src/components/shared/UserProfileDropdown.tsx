"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UserRound,
  Settings,
  LogOut,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserProfileDropdown() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [signingOut, setSigningOut] = useState(false);

  const user = session?.user;

  const getInitials = (name?: string | null) => {
    if (!name) return "U";

    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
  };

  const handleSignOut = async () => {
    setSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error(result.error.message || "Sign out failed.");
        return;
      }

      toast.success("You have signed out.");
      router.push("/");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";

      toast.error(message);
    } finally {
      setSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex h-10 w-10 items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <Button
        render={<Link href="/sign-in" />}
        className="rounded-full"
      >
        Sign In
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="group h-auto rounded-full p-1.5 pr-3 transition hover:bg-violet-50"
          />
        }
      >
        <Avatar className="h-9 w-9 border border-violet-100">
          <AvatarImage
            src={user.image || ""}
            alt={user.name || "User avatar"}
          />
          <AvatarFallback className="bg-violet-100 font-semibold text-violet-700">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>

        <div className="ml-2 hidden text-left sm:block">
          <p className="max-w-32 truncate text-sm font-semibold text-slate-800">
            {user.name || "User"}
          </p>
          <p className="max-w-32 truncate text-xs text-slate-500">
            {user.email}
          </p>
        </div>

        <ChevronDown className="ml-2 h-4 w-4 text-slate-500 transition-transform group-data-[state=open]:rotate-180" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-64 rounded-2xl border border-slate-200 p-2 shadow-xl"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="p-3 font-normal">
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11">
                <AvatarImage
                  src={user.image || ""}
                  alt={user.name || "User avatar"}
                />
                <AvatarFallback className="bg-violet-100 font-semibold text-violet-700">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {user.name || "User"}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {user.email}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            render={<Link href="/dashboard" />}
            className="cursor-pointer rounded-lg p-2.5"
          >
            <UserRound className="mr-2 h-4 w-4 text-slate-500" />
            Dashboard
          </DropdownMenuItem>

          <DropdownMenuItem
            render={<Link href="/profile" />}
            className="cursor-pointer rounded-lg p-2.5"
          >
            <UserRound className="mr-2 h-4 w-4 text-slate-500" />
            My Profile
          </DropdownMenuItem>

          <DropdownMenuItem
            render={<Link href="/settings" />}
            className="cursor-pointer rounded-lg p-2.5"
          >
            <Settings className="mr-2 h-4 w-4 text-slate-500" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => void handleSignOut()}
          disabled={signingOut}
          className="cursor-pointer rounded-lg p-2.5 text-red-600 focus:bg-red-50 focus:text-red-600"
        >
          {signingOut ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="mr-2 h-4 w-4" />
          )}

          {signingOut ? "Signing out..." : "Sign Out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}