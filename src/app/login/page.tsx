'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import Link from 'next/link'

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
                <div className="text-center space-y-2">
                    <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                        Forgot your password?
                    </Link>
                    <div className="text-sm text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="text-blue-600 hover:text-blue-800">
                            Sign up
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )

}