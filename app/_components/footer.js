import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {/* Brand Section */}
                    <div className="sm:col-span-2 lg:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">C</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold">CPS Academy</h3>
                        </div>
                        <p className="text-gray-300 mb-6 text-sm sm:text-base max-w-md">
                            Master competitive programming with expert guidance. Join our community of passionate programmers and unlock your potential in coding competitions.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/bd.cpsacademy" target="_blank" rel="noopener noreferrer" 
                               className="text-gray-400 hover:text-blue-500 transition-colors">
                                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/company/cps-academy/" target="_blank" rel="noopener noreferrer"
                               className="text-gray-400 hover:text-blue-500 transition-colors">
                                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                            <a href="mailto:shahriar@cpsacademy.io"
                               className="text-gray-400 hover:text-blue-500 transition-colors">
                                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="mt-6 sm:mt-0">
                        <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/courses" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">Courses</Link></li>
                            <li><Link href="/trainers" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">Trainers</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-6 sm:mt-0">
                        <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact</h4>
                        <div className="space-y-2 text-gray-300 text-sm sm:text-base">
                            <p className="flex items-start">
                                <svg className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                                <span className="break-all">shahriar@cpsacademy.io</span>
                            </p>
                            <p className="flex items-start">
                                <svg className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"/>
                                </svg>
                                <span>Online Platform</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                    <p className="text-gray-400 text-xs sm:text-sm">
                        © 2025 CPS Academy. All rights reserved.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
                        <Link href="/privacy" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}