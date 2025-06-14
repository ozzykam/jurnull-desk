'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth, db } from '@/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'  
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user


            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email: user.email,
                createdAt: new Date(),
            })

            toast.success('Account created successfully!')
            router.push('/')
        } catch (error) {
            console.error('Signup error:', error)
            toast.error('Failed to create account. Please check your credentials.')
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSignup} className="space-y-4 w-80">
                <h1 className="text-2xl font-bold text-center">Sign Up</h1>
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
                    Sign Up
                </Button>
            </form>
        </div>
    )
}