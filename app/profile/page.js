"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Profile() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const router = useRouter()

    async function fetchUser() {
        try {
            const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
            
            if (!token) {
                router.push("/login")
                return
            }

            const response = await fetch("https://strapicpsacademy-production.up.railway.app/api/users/me?populate=role", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            if (!response.ok) {
                throw new Error('Failed to fetch user data')
            }
            
            const data = await response.json()
            localStorage.setItem("user", JSON.stringify(data))
            setUser(data)
        } catch (error) {
            console.error('Error fetching user:', error)
            setError("Failed to load profile. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        router.push("/login")
    }

    useEffect(() => {
        fetchUser()
    }, [])

    if (loading) {
        return (
            <div className="py-12">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg border border-gray-200 p-8">
                        <div className="text-center">
                            <div className="text-lg text-gray-600">Loading profile...</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="py-12">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg border border-gray-200 p-8">
                        <div className="text-center">
                            <div className="text-lg text-red-600 mb-4">{error}</div>
                            <button 
                                onClick={fetchUser}
                                className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="py-12">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg border border-gray-200 p-8">
                        <div className="text-center">
                            <div className="text-lg text-gray-600">No user data found.</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="py-8">
            <div className="max-w-2xl mx-auto">
                {/* Profile Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
                    <p className="text-gray-600">Manage your account information</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {/* Profile Info */}
                    <div className="p-6">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-2xl font-semibold text-gray-600">
                                    {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                                </span>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">{user.username}</h2>
                                <p className="text-gray-600">{user.email}</p>
                            </div>
                        </div>

                        {/* User Details */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                <span className="text-sm font-medium text-gray-700">Username</span>
                                <span className="text-sm text-gray-900">{user.username}</span>
                            </div>
                            
                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                <span className="text-sm font-medium text-gray-700">Email</span>
                                <span className="text-sm text-gray-900">{user.email}</span>
                            </div>
                            
                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                <span className="text-sm font-medium text-gray-700">Role</span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {user.role?.name || 'Student'}
                                </span>
                            </div>
                            
                            {user.createdAt && (
                                <div className="flex justify-between items-center py-3">
                                    <span className="text-sm font-medium text-gray-700">Member Since</span>
                                    <span className="text-sm text-gray-900">
                                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                            <button 
                                onClick={() => router.push('/courses')}
                                className="text-gray-900 hover:text-gray-700 font-medium text-sm"
                            >
                                View Courses
                            </button>
                            <button 
                                onClick={handleLogout}
                                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Additional Stats or Info */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-1">Account Status</h3>
                        <p className="text-lg font-semibold text-green-600">Active</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-1">Access Level</h3>
                        <p className="text-lg font-semibold text-gray-900">{user.role?.name || 'Student'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}