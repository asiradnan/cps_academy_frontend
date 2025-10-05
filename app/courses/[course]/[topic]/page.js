"use client"

import { useEffect, useState } from "react";

export default function Topic({ params }) {
    const [topic, setTopic] = useState({})
    async function fetchTopic() {
        const response = await fetch(`https://strapicpsacademy-production.up.railway.app/api/topics/${params.topic}?populate=classes`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        const data = await response.json()
        setTopic(data.data)
        console.log(data)
    }
    useEffect(() => {
        fetchTopic()
    }, [])
    return (
        <>
            <h1>Topic:</h1>
            <h1>{topic.title}</h1>
            <ol>
                {topic.classes && topic.classes.map((x, index) => {
                    return (
                        <li key={index}> {x.title} </li>
                    )
                })}
            </ol>
        </>
    );
}
