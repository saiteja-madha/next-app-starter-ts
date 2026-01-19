"use client"

import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { ModeToggle } from "./mode-toggle"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User } from "lucide-react"

export function Header() {
    const { signOut, useSession } = authClient
    const { data: session } = useSession()

    return (
        <header className="sticky top-0 z-50 flex h-12 justify-between border-b bg-background/60 px-safe-or-4 backdrop-blur md:h-14 md:px-safe-or-6 px-6">
            <Link href="/" className="flex items-center gap-2">
                <svg
                    className="size-5"
                    fill="none"
                    height="45"
                    viewBox="0 0 60 45"
                    width="60"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        className="fill-black dark:fill-white"
                        clipRule="evenodd"
                        d="M0 0H15V45H0V0ZM45 0H60V45H45V0ZM20 0H40V15H20V0ZM20 30H40V45H20V30Z"
                        fillRule="evenodd"
                    />
                </svg>
                BETTER-AUTH. STARTER
            </Link>

            <div className="flex items-center gap-2">
                <ModeToggle />
                {!session?.user ? (
                    <div className="flex items-center gap-2">
                        <Link href="/auth/register">
                            <Button variant="ghost" size="sm">
                                Sign Up
                            </Button>
                        </Link>
                        <Link href="/auth/sign-in">
                            <Button size="sm">Sign In</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        {/* User Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-8 w-8 rounded-full"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage
                                            src={session.user?.image || ""}
                                            alt={session.user?.name || ""}
                                        />
                                        <AvatarFallback className="text-xs">
                                            {session.user?.name
                                                ?.charAt(0)
                                                ?.toUpperCase() ||
                                                session.user?.email
                                                    ?.charAt(0)
                                                    ?.toUpperCase() ||
                                                "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-56"
                                align="end"
                                forceMount
                            >
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {session.user?.name || "User"}
                                        </p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {session.user?.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/dashboard"
                                        className="cursor-pointer"
                                    >
                                        <User className="mr-2 h-4 w-4" />
                                        Dashboard
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => signOut()}
                                    className="cursor-pointer text-destructive focus:text-destructive"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Sign Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}
            </div>
        </header>
    )
}
