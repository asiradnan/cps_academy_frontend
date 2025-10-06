"use client"
import Link from "next/link"
import NavBar from "./nav"
import { useState } from "react"

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center">
                        <span className="text-xl sm:text-2xl font-bold text-gray-900">CPS Academy</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <NavBar />
                    </nav>

                    {/* Mobile menu button */}
                    <button 
                        className="md:hidden p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden pb-4 border-t border-gray-200">
                        <div className="pt-4 space-y-3">
                            <NavBar />
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}