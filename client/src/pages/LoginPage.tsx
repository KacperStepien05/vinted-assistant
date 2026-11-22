import React, { useState } from "react";
import { useNavigate, Link } from "react-router";

export default function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        try {
            const response = await fetch("/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) })
            const data = await response.json().catch(() => null)
            if(response.ok) {
                navigate("/")
                return
            }
            setError(data?.error ?? "Login failed")
        } catch {
            setError("Can't reach the server, check your connection");
        }
    }


    return( 
        <>
            <h1 className="text-2xl font-bold">Login</h1>
            {error && <p className="text-red-600">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} placeholder="jhon123@mail.com" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" value={password} placeholder="********" onChange={(e) => setPassword(e.target.value)} required/>
                <button type="submit">Login</button>
            </form>
            <Link to="/register">No account? Register</Link>
        </>
    );
}