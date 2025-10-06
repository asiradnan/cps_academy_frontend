"use client"

import { useEffect, useState } from "react"

export default function Profile() {
    const [user, setUser] = useState(null);
    async function fetchUser() {
        const response = await fetch("https://strapicpsacademy-production.up.railway.app/api/users/me?populate=role",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        const data = await response.json()
        localStorage.setItem("user", JSON.stringify(data))
    }
    useEffect(() => {
        fetchUser()
        setUser(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null)
    }, [])
    if (!user) {
        return <p>Loading...</p>
    }
    return (
        <>
            <h1>Profile Page</h1>
            <h2>username: {user.username}</h2>
            <h2>email: {user.email}</h2>
            <h2>role: {user.role.name}</h2>
        </>

    )
}