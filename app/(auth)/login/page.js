"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"

export default function Login() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    async function submitLoginForm(event){
        event.preventDefault()
        setIsLoading(true)
        setError("")
        
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)
        
        try {
            const response = await fetch("https://strapicpsacademy-production.up.railway.app/api/auth/local?populate=*", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const result = await response.json()
            
            if (result.jwt){
                localStorage.setItem("token", result.jwt)
                const response2 = await fetch("https://strapicpsacademy-production.up.railway.app/api/users/me?populate=role", {
                    headers: {
                        Authorization: `Bearer ${result.jwt}`
                    }
                })
                const userData = await response2.json()
                localStorage.setItem("user", JSON.stringify(userData))
                router.push("/")
            } else {
                setError("Invalid email/username or password")
            }
        } catch (error) {
            console.error("Error during login:", error)
            setError("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <Link href="/" className="flex justify-center">
                        <span className="text-3xl sm:text-4xl font-bold text-gray-900">CPS Academy</span>
                    </Link>
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <Link href="/signup" className="font-medium text-gray-900 hover:text-gray-700">
                            create a new account
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={submitLoginForm}>
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
                                Email or Username
                            </label>
                            <input
                                id="identifier"
                                name="identifier"
                                type="text"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your email or username"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Signing in..." : "Sign in"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}