"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function Courses() {
    const [courses, setCourses] = useState([])
    async function fetchCourses() {
        const response = await fetch("https://strapicpsacademy-production.up.railway.app/api/courses",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        const data = await response.json()
        setCourses(data.data)
        localStorage.setItem("courses", JSON.stringify(data.data))
    }
    useEffect(() => {
        fetchCourses()
    }, [])
    if (courses.length === 0) {
        return <h1>Loading...</h1>
    }
    return (
        <>
            <ol>
                {courses && courses.map((course, index) => {
                    return (
                        <li key={index}>
                            <Link href={`/courses/${course.documentId}`}>{course.title}</Link>
                        </li>
                    )
                })}
            </ol>
        </>

    )
}