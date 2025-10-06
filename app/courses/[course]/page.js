"use client"

import { useEffect, useState, use } from "react";
import Link from "next/link";

export default function Course({ params }) {
    const [course, setCourse] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    const param = use(params)

    async function fetchCourse() {
        try {
            let response;
            const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
            
            if (token) {
                response = await fetch(`https://strapicpsacademy-production.up.railway.app/api/courses/${param.course}?populate=topics`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            } else {
                response = await fetch(`https://strapicpsacademy-production.up.railway.app/api/courses/${param.course}?populate=topics`)
            }
            
            const data = await response.json()
            setCourse(data.data || {})
        } catch (error) {
            console.error('Error fetching course:', error)
            setCourse({})
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsLoggedIn(localStorage.getItem("token") ? true : false)
        }
        fetchCourse()
    }, [param.course])

    if (loading) {
        return (
            <div className="py-12">
                <div className="text-center">
                    <div className="text-lg text-gray-600">Loading course...</div>
                </div>
            </div>
        )
    }

    if (!course.title) {
        return (
            <div className="py-12">
                <div className="text-center">
                    <div className="text-lg text-gray-600">Course not found.</div>
                    <Link href="/courses" className="text-gray-900 hover:text-gray-700 font-medium mt-2 inline-block">
                        ← Back to Courses
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="py-8">
            {/* Breadcrumb */}
            <nav className="mb-6">
                <Link href="/courses" className="text-gray-600 hover:text-gray-900 text-sm">
                    ← Back to Courses
                </Link>
            </nav>

            {/* Course Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
                {course.description && (
                    <p className="text-gray-600">{course.description}</p>
                )}
            </div>

            {/* Topics Section */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Topics</h2>
                
                {!course.topics || course.topics.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <p className="text-gray-600">No topics available for this course yet.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {course.topics.map((topic, index) => {
                            const key = topic.id ?? topic._id ?? topic.documentId ?? index
                            return (
                                <div key={key} className={`p-4 border border-gray-200 rounded-lg ${isLoggedIn ? 'hover:border-gray-300 transition-colors' : ''}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <span className="flex-shrink-0 w-6 h-6 bg-gray-100 text-gray-600 text-sm font-medium rounded-full flex items-center justify-center">
                                                {index + 1}
                                            </span>
                                            <div>
                                                {isLoggedIn ? (
                                                    <Link 
                                                        href={`/courses/${course.documentId}/${topic.documentId}`}
                                                        className="text-gray-900 hover:text-gray-700 font-medium"
                                                    >
                                                        {topic.title}
                                                    </Link>
                                                ) : (
                                                    <span className="text-gray-700 font-medium">{topic.title}</span>
                                                )}
                                                {topic.description && (
                                                    <p className="text-sm text-gray-600 mt-1">{topic.description}</p>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {!isLoggedIn && (
                                            <div className="flex items-center text-sm text-gray-500">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 1L3 5v6c0 5.55 3.84 9.75 9 9.75s9-4.2 9-9.75V5l-10-4z"/>
                                                </svg>
                                                Login required
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Login CTA for non-logged in users */}
            {!isLoggedIn && course.topics && course.topics.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to start learning?</h3>
                    <p className="text-gray-600 mb-4">Sign in to access all course topics and start your learning journey.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link 
                            href="/login" 
                            className="bg-gray-900 text-white px-6 py-2 rounded font-medium hover:bg-gray-800 transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link 
                            href="/signup" 
                            className="border border-gray-300 text-gray-700 px-6 py-2 rounded font-medium hover:bg-gray-50 transition-colors"
                        >
                            Create Account
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
