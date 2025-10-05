"use client"
import { redirect } from "next/navigation";

export default function Login() {
    async function submitLoginForm(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        var success = false;
        try {
            const response = await fetch("https://strapicpsacademy-production.up.railway.app/api/auth/local?populate=*", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const result = await response.json();
            console.log(result);
            if (result.jwt){
                localStorage.setItem("token", result.jwt);
                const response2 = await fetch("https://strapicpsacademy-production.up.railway.app/api/users/me?populate=role", {
                    headers: {
                        Authorization: `Bearer ${result.jwt}`
                    }
                })
                alert("Login successful!");
                const result2 = await response2.json();
                console.log(result2);
                localStorage.setItem("user", JSON.stringify(result2.data));
                console.log("User logged in:", result2.data);
                success = true;
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
        if (!success) {
            alert("Login failed! Please check your credentials.");
            return
        }
        redirect("/")
    }
    return (
        <form onSubmit={submitLoginForm}>
            <label for="identifier">Identifier: </label>
            <input type="text" name="identifier" required />
            <br />
            <label for="password">Password: </label>
            <input type="password" name="password" required />
            <br />
            <button type="submit">Log In</button>
        </form>
    )
}