"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function Trainers() {
    const [trainers, setTrainers] = useState([])
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    async function fetchTrainers() {
        try {
            const response = await fetch('https://strapicpsacademy-production.up.railway.app/api/trainers?populate=*')
            const data = await response.json()
            setTrainers(data.data || [])
        } catch (error) {
            console.error('Error fetching trainers:', error)
            setTrainers([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTrainers()
        if (typeof window !== "undefined") {
            const userData = localStorage.getItem('user')
            setUser(userData ? JSON.parse(userData) : null)
        }
    }, [])

    if (loading) {
        return (
            <div className="py-12">
                <div className="text-center">
                    <div className="text-lg text-gray-600">Loading trainers...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Our Trainers</h1>
                    <p className="text-gray-600 mt-2">Meet our expert competitive programming instructors</p>
                </div>
                {user?.role?.name === 'Social Media Manager' && (
                    <Link 
                        href="/trainers/add"
                        className="bg-gray-900 text-white px-4 py-2 rounded font-medium hover:bg-gray-800 transition-colors"
                    >
                        Add Trainer
                    </Link>
                )}
            </div>

            {/* Trainers Grid */}
            {trainers.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600">No trainers found.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trainers.map((trainer, idx) => {
                        const key = trainer.id ?? trainer._id ?? trainer.documentId ?? idx
                        return (
                            <div key={key} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                                {/* Admin Controls */}
                                {user?.role?.name === 'Social Media Manager' && (
                                    <div className="flex justify-end mb-4">
                                        <Link 
                                            href={`/trainers/edit/${trainer.documentId ?? key}`}
                                            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                        >
                                            Edit
                                        </Link>
                                    </div>
                                )}

                                {/* Profile Image */}
                                <div className="flex justify-center mb-4">
                                    <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                                        {trainer.profilePicture?.url ? (
                                            <Image 
                                                src={`https://strapicpsacademy-production.up.railway.app${trainer.profilePicture.url}`} 
                                                alt={trainer.name || 'Trainer'} 
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Name */}
                                <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                                    {trainer.name || 'Unknown Trainer'}
                                </h3>

                                {/* Codeforces Handle */}
                                {trainer.codeforcesHandle && (
                                    <div className="text-center mb-4">
                                        <Link 
                                            href={`https://codeforces.com/profile/${trainer.codeforcesHandle}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                        >
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2L2 7v10c0 5.55 3.84 9.75 9 9.75s9-4.2 9-9.75V7l-10-5z"/>
                                            </svg>
                                            {trainer.codeforcesHandle}
                                        </Link>
                                    </div>
                                )}

                                {/* About sections */}
                                <div className="space-y-2 text-sm text-gray-600">
                                    {trainer.about1 && (
                                        <p>{trainer.about1}</p>
                                    )}
                                    {trainer.about2 && (
                                        <p>{trainer.about2}</p>
                                    )}
                                    {trainer.about3 && (
                                        <p>{trainer.about3}</p>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}