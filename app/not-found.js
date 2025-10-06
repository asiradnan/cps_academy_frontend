import Link from "next/link"

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center">
                <div className="mx-auto mb-8">
                    <div className="relative">
                        <div className="text-8xl font-bold text-gray-200 select-none">404</div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m6-10.172a10 10 0 11-14.142 0M12 6.828a6 6 0 110 6.344" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Even Binary Search Failed to Find This Page
                    </h1>
                    
                    <div className="space-y-2 text-gray-600">
                        <p className="text-lg">
                            🔍 <code className="bg-gray-100 px-2 py-1 rounded text-sm">O(log n)</code> complexity, but still no results!
                        </p>
                        <p>
                            Looks like this URL is as elusive as a bug that only appears in production.
                        </p>
                        <p className="italic">
                            "404: The only time when doing nothing is the right algorithm."
                        </p>
                    </div>
                </div>

                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm text-left mb-8 shadow-lg">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-gray-400 ml-2">error.log</span>
                    </div>
                    <div className="space-y-1">
                        <div><span className="text-red-400">Error:</span> Page not found</div>
                        <div><span className="text-yellow-400">Status:</span> 404</div>
                        <div><span className="text-blue-400">Suggestion:</span> Try a different route</div>
                        <div><span className="text-purple-400">Debug:</span> Check your navigation logic</div>
                    </div>
                </div>


                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                    <div className="text-sm text-blue-800 space-y-2">
                        <p>💡 <strong>Did you know?</strong></p>
                        <p>This page has achieved <code>O(∞)</code> time complexity for loading!</p>
                        <p>It's not a bug, it's an undocumented feature of the internet.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Link 
                            href="/"
                            className="inline-flex items-center justify-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors font-medium"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Go Home
                        </Link>
                        
                        <Link 
                            href="/courses"
                            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            View Courses
                        </Link>
                    </div>

                    <Link 
                        href="/trainers"
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Or meet our trainers who definitely know where they're going
                    </Link>
                </div>
            </div>
        </div>
    )
}