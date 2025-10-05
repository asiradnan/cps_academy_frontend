"use client"
import Link from "next/link"
import { redirect, usePathname } from "next/navigation"
import { useState } from "react"

export default function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") ? true : false)
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
    const navLinks = [
        { href: "/", name: "Home" },
        { href: "/courses", name: "Courses" },
        { href: "/trainers", name: "Trainers" },
    ]
    const pathname = usePathname()
    return (
        <>
            {navLinks.map((link) => {
                const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/")
                return <Link href={link.href} key={link.name} className={isActive ? "font-bold" : ""}>{link.name}</Link>
            }
            )}
            {isLoggedIn ?
                (<>
                    {user && user.role && user.role.name === "Social Media Manager" &&
                        <Link href="/smm" key="smm" className={pathname === "/smm" ? "font-bold" : ""}>Social Media Management</Link>
                    }
                    {user && user.role && user.role.name === "Developer" &&
                        <Link href="/dev" key="dev" className={pathname === "/dev" ? "font-bold" : ""}>Developer Panel</Link>
                    }
                    <Link href="/profile" key="profile" className={pathname === "/profile" ? "font-bold" : ""}>Profile</Link>
                    <button onClick={() => {
                        localStorage.removeItem("token");
                        setIsLoggedIn(false);
                        redirect("/");
                    }}>Log Out</button>

                </>)
                :
                (<>
                    <Link href="/login" key="login" className={pathname === "/login" ? "font-bold" : ""}>Log In</Link>
                    <Link href="/signup" key="signup" className={pathname === "/signup" ? "font-bold" : ""}>Sign Up</Link>

                </>)
            }
        </>
    )
}