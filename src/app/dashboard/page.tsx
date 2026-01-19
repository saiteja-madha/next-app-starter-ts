import { Header } from "@/components/header"

export default function Page() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <h2 className="text-3xl font-bold mb-4">
                    Hello World! This is a protected route
                </h2>
            </div>
        </div>
    )
}
