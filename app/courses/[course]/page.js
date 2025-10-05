"use client"

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Course({ params }) {
    const [course, setCourse] = useState({})
    async function fetchCourse() {
        const response = await fetch(`https://strapicpsacademy-production.up.railway.app/api/courses/${params.course}?populate=topics`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        const data = await response.json()
        setCourse(data.data)
        console.log(data)
    }
    useEffect(() => {
        fetchCourse()
    }, [])
    return (
        <>
            <h1>Course:</h1>
            <h1>{course.title}</h1>
            <ol>
                {course.topics && course.topics.map((topic, index) => {
                    return (
                        <Link href={`/courses/course/${topic.documentId}`} key={index}>{topic.title}</Link>
                    )
                })}
            </ol>
        </>
    );
}
