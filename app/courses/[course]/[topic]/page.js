"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import Link from "next/link";

export default function Topic({ params }) {
    const param = use(params)
    const router = useRouter()
    const [topic, setTopic] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    async function fetchTopic() {
        try {
            const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
            
            if (!token) {
                router.push("/login")
                return
            }

            const response = await fetch(`https://strapicpsacademy-production.up.railway.app/api/topics/${param.topic}?populate=classes`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            if (!response.ok) {
                throw new Error('Failed to fetch topic')
            }
            
            const data = await response.json()
            setTopic(data.data || {})
        } catch (error) {
            console.error('Error fetching topic:', error)
            setError("Failed to load topic. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTopic()
    }, [param.topic])

    if (loading) {
        return (
            <div className="py-12">
                <div className="text-center">
                    <div className="text-lg text-gray-600">Loading topic...</div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="py-12">
                <div className="text-center">
                    <div className="text-lg text-red-600 mb-4">{error}</div>
                    <Link href="/courses" className="text-gray-900 hover:text-gray-700 font-medium">
                        ← Back to Courses
                    </Link>
                </div>
            </div>
        )
    }

    if (!topic.title) {
        return (
            <div className="py-12">
                <div className="text-center">
                    <div className="text-lg text-gray-600 mb-4">Topic not found.</div>
                    <Link href={`/courses/${param.course}`} className="text-gray-900 hover:text-gray-700 font-medium">
                        ← Back to Course
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="py-8">
            {/* Breadcrumb */}
            <nav className="mb-6">
                <div className="flex items-center space-x-2 text-sm">
                    <Link href="/courses" className="text-gray-600 hover:text-gray-900">
                        Courses
                    </Link>
                    <span className="text-gray-400">/</span>
                    <Link href={`/courses/${param.course}`} className="text-gray-600 hover:text-gray-900">
                        Course
                    </Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-900">{topic.title}</span>
                </div>
            </nav>

            {/* Topic Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{topic.title}</h1>
                {topic.description && (
                    <p className="text-gray-600">{topic.description}</p>
                )}
            </div>

            {/* Classes Section */}
            <div className="space-y-8">
                {!topic.classes || topic.classes.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <p className="text-gray-600">No classes available for this topic yet.</p>
                    </div>
                ) : (
                    topic.classes.map((cls, index) => {
                        const key = cls.id ?? cls._id ?? cls.documentId ?? index
                        return (
                            <div key={key} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                {/* Class Header */}
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex items-center space-x-3">
                                        <span className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-600 text-sm font-medium rounded-full flex items-center justify-center">
                                            {index + 1}
                                        </span>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {cls.title || `Class ${index + 1}`}
                                            </h3>
                                            {cls.description && (
                                                <p className="text-gray-600 text-sm mt-1">{cls.description}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Video Content */}
                                {cls.video_url && (
                                    <div className="p-6">
                                        <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
                                            <iframe 
                                                width="100%" 
                                                height="100%" 
                                                src={cls.video_url} 
                                                title={cls.title || `Class ${index + 1} Video`}
                                                frameBorder="0" 
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                                referrerPolicy="strict-origin-when-cross-origin" 
                                                allowFullScreen
                                                className="w-full h-full"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Class Content/Notes */}
                                {cls.content && (
                                    <div className="p-6 pt-0">
                                        <div className="prose prose-sm max-w-none">
                                            <div className="text-gray-700 whitespace-pre-wrap">
                                                {cls.content}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })
                )}
            </div>

            {/* Navigation */}
            <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex justify-between">
                    <Link 
                        href={`/courses/${param.course}`}
                        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Course
                    </Link>
                    
                    {/* Future: Add next/previous topic navigation */}
                </div>
            </div>
        </div>
    );
}
