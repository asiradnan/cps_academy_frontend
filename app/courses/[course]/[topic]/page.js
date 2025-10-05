"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Topic() {
    const params = useParams()
    console.log(params) 
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
                {topic.classes && topic.classes.map((cls, index) => {
                    return (
                        <>
                            <li key={index}> {cls.title} </li>
                            <iframe width="80%" height="auto" src={cls.video_url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </>


                    )
                })}
            </ol>
        </>
    );
}
