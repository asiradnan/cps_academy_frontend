"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const router = useRouter()
    
    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsLoggedIn(localStorage.getItem("token") ? true : false)
            const userData = localStorage.getItem("user")
            setUser(userData ? JSON.parse(userData) : null)
        }
    }, [])
    const navLinks = [
        { href: "/courses", name: "Courses" },
        { href: "/trainers", name: "Trainers" },
    ]
    const pathname = usePathname()
    return (
        <div className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-3 md:space-y-0">
            {/* Main Navigation Links */}
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-3 md:space-y-0">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/")
                    return (
                        <Link 
                            href={link.href} 
                            key={link.name} 
                            className={`text-sm block md:inline ${isActive ? "font-semibold text-gray-900" : "text-gray-600 hover:text-gray-900"}`}
                        >
                            {link.name}
                        </Link>
                    )
                })}
                {/* Admin Links */}
                {isLoggedIn && user?.role?.name === "Social Media Manager" && (
                    <Link 
                        href="/smm" 
                        key="smm" 
                        className={`text-sm block md:inline ${pathname === "/smm" ? "font-semibold text-gray-900" : "text-gray-600 hover:text-gray-900"}`}
                    >
                        Admin
                    </Link>
                )}
                {isLoggedIn && user?.role?.name === "Developer" && (
                    <Link 
                        href="/dev-panel" 
                        key="dev" 
                        className={`text-sm block md:inline ${pathname === "/dev-panel" ? "font-semibold text-gray-900" : "text-gray-600 hover:text-gray-900"}`}
                    >
                        Dev
                    </Link>
                )}
            </div>

            {/* Auth Links - Right Side */}
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-3 md:space-y-0 md:border-l md:border-gray-200 md:pl-6">
                {isLoggedIn ? (
                    <>
                        <Link 
                            href="/profile" 
                            key="profile" 
                            className={`text-sm block md:inline ${pathname === "/profile" ? "font-semibold text-gray-900" : "text-gray-600 hover:text-gray-900"}`}
                        >
                            Profile
                        </Link>
                        <button 
                            onClick={() => {
                                localStorage.removeItem("token");
                                localStorage.removeItem("user");
                                localStorage.removeItem("courses");
                                setIsLoggedIn(false);
                                router.push("/");
                            }}
                            className="text-sm text-red-600 hover:text-red-700 text-left md:text-center"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link 
                            href="/login" 
                            key="login" 
                            className={`text-sm block md:inline ${pathname === "/login" ? "font-semibold text-gray-900" : "text-gray-600 hover:text-gray-900"}`}
                        >
                            Login
                        </Link>
                        <Link 
                            href="/signup" 
                            key="signup" 
                            className="text-sm bg-gray-900 text-white px-3 py-1.5 rounded hover:bg-gray-800 text-center md:inline-block"
                        >
                            Sign up
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}