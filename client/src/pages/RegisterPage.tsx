import React, { useState } from "react";
import { useNavigate, Link } from "react-router";

export default function RegisterPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        try {
            const response = await fetch("/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) })
            const data = await response.json().catch(() => null)
            if(response.ok) {
                navigate("/login")
                return
            }
            setError(data?.error ?? "Registration failed")
        } catch {
        setError("Can't reach the server, check your connection");
        }

    }



    return (
    <>
        <h1 className="text-2xl font-bold">Register</h1>
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} placeholder="jhon123@mail.com" onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" value={password} minLength={8} placeholder="********" onChange={(e) => setPassword(e.target.value)} required/>
            <button type="submit">Submit</button>
        </form>
        <Link to="/login">Already have an account? Log in</Link>
    </>
    );
}