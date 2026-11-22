import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

type User = {
    id: number
    email: string
}

export default function HomePage() {

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const checkAuth = async () => {
        try {
            const response = await fetch("/auth/me")
            if(!response.ok) {
                navigate("/login")
                return
            }
            const data = await response.json()
            setUser(data)
        } finally {
            setLoading(false)
        }
    }
    checkAuth()
    }, [navigate])

    const handleLogout = async () => {
        await fetch("/auth/logout", { method: "POST" })
        navigate("/login")
    }

    if(loading) {
        return <p>Loading ...</p> 
    }

    return (
        <>
            <h1 className="text-2xl font-bold">Home</h1>
            <div>
                <p>Logged in as: {user?.email}</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </>
    )
}