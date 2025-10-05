"use client"

import { useEffect, useState, use } from "react";
import Link from "next/link";

export default function Course({ params }) {
    const [course, setCourse] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const param = use(params)
    async function fetchCourse() {
        var response;
        if (localStorage.getItem("token")) {
            response = await fetch(`https://strapicpsacademy-production.up.railway.app/api/courses/${param.course}?populate=topics`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
        }
        else {
            response = await fetch(`https://strapicpsacademy-production.up.railway.app/api/courses/${params.course}?populate=topics`)
        }
        const data = await response.json()
        setCourse(data.data)
        console.log(data)
    }
    useEffect(() => {
        fetchCourse()
        setIsLoggedIn(localStorage.getItem("token") ? true : false)
    }, [])
    return (
        <>
            <h1>Course:</h1>
            <h1>{course.title}</h1>
            <ol>
                {course.topics?.map((topic, index) => {
                    return (
                        <li key={index}>
                            {isLoggedIn ? <Link href={`/courses/${course.documentId}/${topic.documentId}`}>{topic.title}</Link> : topic.title}
                        </li>
                    )
                })}
            </ol>
        </>
    );
}
