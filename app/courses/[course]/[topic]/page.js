"use client"

import { redirect } from "next/dist/server/api-utils";
import { useEffect, useState, use } from "react";

export default function Topic({params}) {

    const param = use(params)
    console.log(param) 
    const [topic, setTopic] = useState({})
    async function fetchTopic() {
        const response = await fetch(`https://strapicpsacademy-production.up.railway.app/api/topics/${param.topic}?populate=classes`,
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
        if (!localStorage.getItem("token")) redirect("/login")
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
