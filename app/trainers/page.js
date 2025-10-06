"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function Trainers() {
    const [trainers, setTrainers] = useState([])
    const [user, setUser] = useState(null)
    async function fetchTrainers() {
        const response = await fetch('https://strapicpsacademy-production.up.railway.app/api/trainers?populate=*')
        const data = await response.json()
        console.log(data)
        setTrainers(data.data)
    }

    useEffect(() => {
        fetchTrainers()
        setUser(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
    }, [])
    if (!trainers) return <div>Loading...</div>
    return (
        <>
            <h1>Trainers Page</h1>
            {user && user.role.name === 'Social Media Manager' && (
                <Link href="/trainers/add">Add Trainer</Link>
            )}
            {trainers && trainers.map((trainer, idx) => {
                return (
                    <div key={idx}>
                        {user && user.role.name === 'Social Media Manager' && (
                            <Link href="/trainers/edit">Edit</Link>
                        )}
                        <h3>{trainer.name}</h3>
                        <Image src={`https://strapicpsacademy-production.up.railway.app${trainer.profilePicture.url}`} alt={trainer.name} width={200} height={200} />
                        <Link href={`https://codeforces.com/profile/${trainer.codeforcesHandle}`}>{trainer.codeforcesHandle}</Link >
                        <h4>{trainer.about1}</h4>
                        <h4>{trainer.about2}</h4>
                        <h4>{trainer.about3}</h4>

                    </div>

                )
            })}
            
        </>
    )
}