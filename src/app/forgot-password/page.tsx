'use client'

import { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { FirebaseError } from 'firebase/app';
import Link from 'next/link'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) {
            toast.error('Please enter your email address')
            return
        }

        setIsLoading(true)
        try {
            await sendPasswordResetEmail(auth, email)
            setEmailSent(true)
            toast.success('Password reset email sent! Check your inbox.')
        } catch (error) {
            console.error('Password reset error:', error)
            if (error instanceof FirebaseError) {
                if (error.code === 'auth/user-not-found') {
                    toast.error('No account found with this email address')
                } else if (error.code === 'auth/invalid-email') {
                    toast.error('Please enter a valid email address')
                } else {
                    toast.error('Failed to send reset email. Please try again.')
                }
            } else {
                toast.error('An unexpected error occurred. Please try again later.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    if (emailSent) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="space-y-4 w-80 text-center">
                    <h1 className="text-2xl font-bold">Check Your Email</h1>
                    <p className="text-gray-600">
                        We&apos;ve sent a password reset link to <strong>{email}</strong>
                    </p>
                    <p className="text-sm text-gray-500">
                        Didn&apos;t receive the email? Check your spam folder or try again.
                    </p>
                    <Button 
                        onClick={() => setEmailSent(false)}
                        variant="outline" 
                        className="w-full"
                    >
                        Try Different Email
                    </Button>
                    <Link href="/login" className="block">
                        <Button variant="ghost" className="w-full">
                            Back to Login
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleResetPassword} className="space-y-4 w-80">
                <h1 className="text-2xl font-bold text-center">Reset Password</h1>
                <p className="text-center text-gray-600">
                    Enter your email address and we&apos;ll send you a link to reset your password.
                </p>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
                <Link href="/login" className="block">
                    <Button variant="ghost" className="w-full">
                        Back to Login
                    </Button>
                </Link>
            </form>
        </div>
    )
}