"use client"
import Header from "./_components/header";
import { usePathname } from "next/navigation";

export default function Template({ children }) {
    const pathname = usePathname()
    const isHomePage = pathname === "/"
    
    return (
        <>
            <Header />
            <div className={isHomePage ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"}>
                {children}
            </div>
        </>
    )
}