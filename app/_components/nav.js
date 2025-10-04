"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavBar() {
    const navLinks = [
        { href: "/courses", name: "Courses" }
    ]
    const pathname = usePathname()
    return (
        <>
            {navLinks.map((link) => {
                const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/")
                return <Link href={link.href} key={link.name} className={isActive ? "font-bold" : ""}>{link.name}</Link>
            }
            )}
        </>
    )
}