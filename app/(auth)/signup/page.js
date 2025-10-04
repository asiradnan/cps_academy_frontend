"use client"
import { redirect } from "next/navigation";

export default function Signup() {
    async function submitSignupForm(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        if (formData.get("password") !== formData.get("confirm_password")) {
            alert("Passwords do not match!");
            return;
        }
        formData.delete("confirm_password");
        const data = Object.fromEntries(formData);
        console.log(data);
        try {
            await fetch("https://strapicpsacademy-production.up.railway.app/api/auth/local/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            alert("Signup successful! Please log in.");
                       
        } catch (error) {
            console.error("Error during signup:", error);
            return
        }
        redirect("/login");
    }
    return (
        <form onSubmit={submitSignupForm}>
            <label for="username">Username: </label>
            <input type="text" name="username" required />
            <br />
            <label for="email">Email: </label>
            <input type="email" name="email" required />
            <br />
            <label for="password">Password: </label>
            <input type="password" name="password" required />
            <br />
            <label for="confirm_password">Confirm Password: </label>
            <input type="password" name="confirm_password" required />
            <br />
            <button type="submit">Sign Up</button>
        </form>
    )
}

// {
//   "username": "foobar",
//   "email": "foo.bar@strapi.io",
//   "password": "Test1234"
// }