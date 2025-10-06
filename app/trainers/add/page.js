"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function AddTrainer() {
    const router = useRouter()
    const [trainer, setTrainer] = useState({
        name: '',
        codeforcesHandle: '',
        about1: '',
        about2: '',
        about3: ''
    })
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
            
            // Check if user has permission to add trainers
            if (parsedUser.role?.name !== 'Social Media Manager' && parsedUser.role?.name !== 'Admin') {
                router.push("/trainers")
                return
            }
        }
    }, [router])

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
            const response = await fetch('https://strapicpsacademy-production.up.railway.app/api/trainers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    data: trainer
                })
            })

            if (!response.ok) {
                throw new Error('Failed to create trainer')
            }

            setSuccess("Trainer added successfully!")
            setTimeout(() => {
                router.push("/trainers")
            }, 1500)
        } catch (error) {
            console.error('Error creating trainer:', error)
            setError("Failed to add trainer. Please try again.")
        } finally {
            setSaving(false)
        }
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
                        <h1 className="text-3xl font-bold text-gray-900">Add New Trainer</h1>
                    </div>
                    <p className="text-gray-600">Add a new trainer to the CPS Academy team</p>
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
                    <div className="mt-8 flex justify-end space-x-4">
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
                            {saving ? 'Adding...' : 'Add Trainer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}