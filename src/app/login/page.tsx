'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
            toast.success('Logged in successfully!')
            router.push('/')
        } catch (error) {
            console.error('Login error:', error)
            toast.error('Failed to log in. Please check your credentials.')
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleLogin} className="space-y-4 w-80">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
                <Button type="submit" className="w-full">
                    Login
                </Button>
            </form>
        </div>
    )

}