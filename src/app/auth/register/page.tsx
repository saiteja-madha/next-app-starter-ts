"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import RegisterForm from "@/components/auth/register-form"
import { GoogleIcon } from "@/components/icons"
import { signInWithGoogle } from "@/lib/auth-client"

const RegisterPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <Card className="w-full max-w-md">
                <CardContent className="flex flex-col gap-4 pt-6">
                    <RegisterForm />
                    <div className="flex items-center my-2">
                        <div className="flex-1 h-px bg-muted-foreground/30" />
                        <span className="mx-3 text-muted-foreground text-xs font-medium">
                            OR
                        </span>
                        <div className="flex-1 h-px bg-muted-foreground/30" />
                    </div>
                    <div className="flex flex-row gap-2 w-full">
                        <Button
                            variant="outline"
                            className="w-full flex items-center justify-center"
                            type="button"
                            onClick={signInWithGoogle}
                        >
                            <GoogleIcon className="mr-2" />
                            Google
                        </Button>
                    </div>
                    <div className="text-center text-sm mt-4">
                        Already have an account?{" "}
                        <Link
                            href="/auth/sign-in"
                            className="text-primary underline hover:no-underline font-medium"
                        >
                            Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default RegisterPage
