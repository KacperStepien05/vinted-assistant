import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function RegisterPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const response = await fetch("/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) })
        const data = await response.json()
        if(response.ok) {
            navigate("/login")
            return
        }
        setError(data.error ?? "Registration failed")
    }



    return (
    <>
        <h1 className="text-2xl font-bold">Register</h1>
        {error && <p className="text-red-600">{error}</p>}
        <form action="" onSubmit={handleSubmit}>
            <input type="email" placeholder="jhon123@mail.com" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="********" onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Submit</button>
        </form>
    </>
    );
}