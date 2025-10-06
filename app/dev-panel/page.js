"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DeveloperPanel() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        totalUsers: 145,
        totalCourses: 8,
        totalTrainers: 5,
        activeStudents: 89
    })
    const [recentUsers, setRecentUsers] = useState([
        { id: 1, username: "john_doe", email: "john@example.com", role: "Student", createdAt: "2025-10-05" },
        { id: 2, username: "jane_smith", email: "jane@example.com", role: "Student", createdAt: "2025-10-04" },
        { id: 3, username: "trainer_alex", email: "alex@example.com", role: "Trainer", createdAt: "2025-10-03" }
    ])
    const router = useRouter()

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
        const userData = typeof window !== "undefined" ? localStorage.getItem("user") : null
        
        if (!token) {
            router.push("/login")
            return
        }

        if (userData) {
            const parsedUser = JSON.parse(userData)
            setUser(parsedUser)
            
            // Check if user has admin/developer access
            if (parsedUser.role?.name !== 'Admin' && parsedUser.role?.name !== 'Developer') {
                router.push("/")
                return
            }
        }
        
        setLoading(false)
    }, [router])

    const handleRoleChange = (userId, newRole) => {
        console.log(`Changing user ${userId} role to ${newRole}`)
        // In a real app, this would make an API call
        alert(`Role change functionality would be implemented here`)
    }

    const handleDeleteUser = (userId) => {
        if (confirm("Are you sure you want to delete this user?")) {
            console.log(`Deleting user ${userId}`)
            // In a real app, this would make an API call
            alert(`Delete user functionality would be implemented here`)
        }
    }

    if (loading) {
        return (
            <div className="py-12">
                <div className="text-center">
                    <div className="text-lg text-gray-600">Loading developer panel...</div>
                </div>
            </div>
        )
    }

    if (!user || (user.role?.name !== 'Admin' && user.role?.name !== 'Developer')) {
        return (
            <div className="py-12">
                <div className="text-center">
                    <div className="text-lg text-red-600 mb-4">Access denied. Developer/Admin access required.</div>
                    <button 
                        onClick={() => router.push("/")}
                        className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Developer Panel</h1>
                <p className="text-gray-600">
                    Manage user roles, course content, and system administration for CPS Academy.
                </p>
            </div>

            {/* System Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Users</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Courses</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.totalCourses}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Active Trainers</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.totalTrainers}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-orange-100 rounded-md flex items-center justify-center">
                                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Active Students</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.activeStudents}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* User Management */}
                <div className="lg:col-span-2">
                    <div className="bg-white border border-gray-200 rounded-lg">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">Recent Users</h3>
                                <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                                    View All Users
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {recentUsers.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-semibold text-gray-600">
                                                    {user.username.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">{user.username}</h4>
                                                <p className="text-sm text-gray-600">{user.email}</p>
                                                <p className="text-xs text-gray-500">Joined {user.createdAt}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <select 
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                            >
                                                <option value="Student">Student</option>
                                                <option value="Trainer">Trainer</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Social Media Manager">SMM</option>
                                            </select>
                                            <button 
                                                onClick={() => handleDeleteUser(user.id)}
                                                className="text-red-400 hover:text-red-600 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions & System Tools */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-white border border-gray-200 rounded-lg">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                        </div>
                        <div className="p-6 space-y-3">
                            <button className="w-full text-left flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-gray-900">Add New Course</span>
                            </button>
                            
                            <button className="w-full text-left flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-gray-900">Manage Trainers</span>
                            </button>
                            
                            <button className="w-full text-left flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-gray-900">System Analytics</span>
                            </button>

                            <button className="w-full text-left flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-gray-900">System Settings</span>
                            </button>
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="bg-white border border-gray-200 rounded-lg">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-sm font-medium text-gray-900">Database</span>
                                </div>
                                <span className="text-sm text-green-600">Healthy</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-sm font-medium text-gray-900">API Server</span>
                                </div>
                                <span className="text-sm text-green-600">Online</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <span className="text-sm font-medium text-gray-900">Storage</span>
                                </div>
                                <span className="text-sm text-yellow-600">75% Used</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-sm font-medium text-gray-900">Email Service</span>
                                </div>
                                <span className="text-sm text-green-600">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Developer Tools */}
            <div className="mt-8 bg-white border border-gray-200 rounded-lg">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Developer Tools</h3>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                            <div className="flex items-center space-x-3 mb-2">
                                <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-gray-900">Database Backup</h4>
                            </div>
                            <p className="text-sm text-gray-600">Create and manage database backups</p>
                        </button>

                        <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                            <div className="flex items-center space-x-3 mb-2">
                                <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-gray-900">System Logs</h4>
                            </div>
                            <p className="text-sm text-gray-600">View and analyze system logs</p>
                        </button>

                        <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                            <div className="flex items-center space-x-3 mb-2">
                                <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-gray-900">Performance Monitor</h4>
                            </div>
                            <p className="text-sm text-gray-600">Monitor system performance metrics</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}