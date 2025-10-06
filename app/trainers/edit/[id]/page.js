"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState, use } from "react"
import Link from "next/link"

export default function EditTrainer({ params }) {
    const param = use(params)
    const router = useRouter()
    const [trainer, setTrainer] = useState({
        name: '',
        codeforcesHandle: '',
        about1: '',
        about2: '',
        about3: ''
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [user, setUser] = useState(null)

    // Check authorization
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
            
            // Check if user has permission to edit trainers
            if (parsedUser.role?.name !== 'Social Media Manager' && parsedUser.role?.name !== 'Admin') {
                router.push("/trainers")
                return
            }
        }
    }, [router])

    // Fetch trainer data
    async function fetchTrainer() {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`https://strapicpsacademy-production.up.railway.app/api/trainers/${param.id}?populate=*`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            if (!response.ok) {
                throw new Error('Failed to fetch trainer')
            }
            
            const data = await response.json()
            if (data.data) {
                setTrainer({
                    name: data.data.name || '',
                    codeforcesHandle: data.data.codeforcesHandle || '',
                    about1: data.data.about1 || '',
                    about2: data.data.about2 || '',
                    about3: data.data.about3 || ''
                })
            }
        } catch (error) {
            console.error('Error fetching trainer:', error)
            setError("Failed to load trainer data.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (param.id && user) {
            fetchTrainer()
        }
    }, [param.id, user])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setTrainer(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        setError("")
        setSuccess("")

        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`https://strapicpsacademy-production.up.railway.app/api/trainers/${param.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    data: trainer
                })
            })

            if (!response.ok) {
                throw new Error('Failed to update trainer')
            }

            setSuccess("Trainer updated successfully!")
            setTimeout(() => {
                router.push("/trainers")
            }, 1500)
        } catch (error) {
            console.error('Error updating trainer:', error)
            setError("Failed to update trainer. Please try again.")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this trainer? This action cannot be undone.")) {
            return
        }

        setSaving(true)
        setError("")

        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`https://strapicpsacademy-production.up.railway.app/api/trainers/${param.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (!response.ok) {
                throw new Error('Failed to delete trainer')
            }

            router.push("/trainers")
        } catch (error) {
            console.error('Error deleting trainer:', error)
            setError("Failed to delete trainer. Please try again.")
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="py-12">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center">
                        <div className="text-lg text-gray-600">Loading trainer...</div>
                    </div>
                </div>
            </div>
        )
    }

    if (!user || (user.role?.name !== 'Social Media Manager' && user.role?.name !== 'Admin')) {
        return (
            <div className="py-12">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center">
                        <div className="text-lg text-red-600">Access denied.</div>
                        <Link href="/trainers" className="text-gray-900 hover:text-gray-700 font-medium mt-4 inline-block">
                            ← Back to Trainers
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="py-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-4 mb-4">
                        <Link href="/trainers" className="text-gray-600 hover:text-gray-900">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Edit Trainer</h1>
                    </div>
                    <p className="text-gray-600">Update trainer information and details</p>
                </div>

                {/* Messages */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-800">{error}</p>
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-800">{success}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="space-y-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={trainer.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                placeholder="Enter trainer name"
                            />
                        </div>

                        {/* Codeforces Handle */}
                        <div>
                            <label htmlFor="codeforcesHandle" className="block text-sm font-medium text-gray-700 mb-2">
                                Codeforces Handle
                            </label>
                            <input
                                type="text"
                                id="codeforcesHandle"
                                name="codeforcesHandle"
                                value={trainer.codeforcesHandle}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                placeholder="Enter Codeforces handle"
                            />
                        </div>

                        {/* About Section 1 */}
                        <div>
                            <label htmlFor="about1" className="block text-sm font-medium text-gray-700 mb-2">
                                About - Section 1
                            </label>
                            <textarea
                                id="about1"
                                name="about1"
                                value={trainer.about1}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                placeholder="Enter first about section"
                            />
                        </div>

                        {/* About Section 2 */}
                        <div>
                            <label htmlFor="about2" className="block text-sm font-medium text-gray-700 mb-2">
                                About - Section 2
                            </label>
                            <textarea
                                id="about2"
                                name="about2"
                                value={trainer.about2}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                placeholder="Enter second about section"
                            />
                        </div>

                        {/* About Section 3 */}
                        <div>
                            <label htmlFor="about3" className="block text-sm font-medium text-gray-700 mb-2">
                                About - Section 3
                            </label>
                            <textarea
                                id="about3"
                                name="about3"
                                value={trainer.about3}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                placeholder="Enter third about section"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex justify-between">
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={saving}
                            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Delete Trainer
                        </button>
                        
                        <div className="flex space-x-4">
                            <Link
                                href="/trainers"
                                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}