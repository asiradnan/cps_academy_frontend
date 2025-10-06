"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function Courses() {
    const [courses, setCourses] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    async function fetchCourses() {
        try {
            setLoading(true)
            const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
            setIsAuthenticated(!!token)
            
            let response;
            if (token) {
                response = await fetch("https://strapicpsacademy-production.up.railway.app/api/courses", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            } else {
                response = await fetch("https://strapicpsacademy-production.up.railway.app/api/courses")
            }
            
            if (!response.ok) {
                throw new Error('Failed to fetch courses')
            }
            
            const data = await response.json()
            setCourses(data.data || [])
            localStorage.setItem("courses", JSON.stringify(data.data || []))
        } catch (error) {
            console.error('Error fetching courses:', error)
            setError("Failed to load courses. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCourses()
    }, [])

    if (loading) {
        return (
            <div className="py-12">
                <div className="text-center">
                    <div className="text-lg text-gray-600">Loading courses...</div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="py-12">
                <div className="text-center">
                    <div className="text-lg text-red-600 mb-4">{error}</div>
                    <button 
                        onClick={fetchCourses}
                        className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">All Courses</h1>
                <p className="text-gray-600">
                    {isAuthenticated 
                        ? "Explore our comprehensive programming courses designed to enhance your competitive programming skills."
                        : "Discover our courses. Sign in to access full course content and track your progress."
                    }
                </p>
            </div>

            {/* Authentication Banner */}
            {!isAuthenticated && (
                <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-blue-800">
                                <Link href="/login" className="font-medium hover:underline">Sign in</Link> or{' '}
                                <Link href="/signup" className="font-medium hover:underline">create an account</Link>{' '}
                                to access course content and track your learning progress.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Courses Grid */}
            {!courses || courses.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <div className="max-w-md mx-auto">
                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No courses available</h3>
                        <p className="text-gray-600">Check back soon for new courses!</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course, index) => {
                        const key = course.id ?? course._id ?? course.documentId ?? index
                        return (
                            <div key={key} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                                {/* Course Content */}
                                <div className="p-6">
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                            {course.title || `Course ${index + 1}`}
                                        </h3>
                                        {course.description && (
                                            <p className="text-gray-600 text-sm line-clamp-3">
                                                {course.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Course Stats */}
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <div className="flex items-center space-x-4">
                                            {course.level && (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    {course.level}
                                                </span>
                                            )}
                                            {course.duration && (
                                                <span>{course.duration}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Course Action */}
                                    <Link 
                                        href={`/courses/${course.documentId}`}
                                        className="block w-full text-center bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium"
                                    >
                                        {isAuthenticated ? 'View Course' : 'View Details'}
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            {/* Footer CTA */}
            {courses && courses.length > 0 && !isAuthenticated && (
                <div className="mt-12 text-center bg-gray-50 rounded-lg p-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to start learning?</h3>
                    <p className="text-gray-600 mb-4">Join CPS Academy to access all course content and track your progress.</p>
                    <div className="space-x-4">
                        <Link 
                            href="/signup"
                            className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium"
                        >
                            Get Started
                        </Link>
                        <Link 
                            href="/login"
                            className="text-gray-600 hover:text-gray-900 font-medium"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}