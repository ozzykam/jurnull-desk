'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { FirebaseError } from 'firebase/app'
import Link from 'next/link'

function ResetPasswordForm() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isValidCode, setIsValidCode] = useState(false)
    const [email, setEmail] = useState('')
    const [codeVerified, setCodeVerified] = useState(false)
    
    const router = useRouter()
    const searchParams = useSearchParams()
    const oobCode = searchParams.get('oobCode')

    useEffect(() => {
        if (oobCode) {
            verifyPasswordResetCode(auth, oobCode)
                .then((email) => {
                    setEmail(email)
                    setIsValidCode(true)
                    setCodeVerified(true)
                })
                .catch((error) => {
                    console.error('Invalid reset code:', error)
                    toast.error('Invalid or expired reset link')
                    setIsValidCode(false)
                })
        }
    }, [oobCode])

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!password || !confirmPassword) {
            toast.error('Please fill in all fields')
            return
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long')
            return
        }

        if (!oobCode) {
            toast.error('Invalid reset code')
            return
        }

        setIsLoading(true)
        try {
            await confirmPasswordReset(auth, oobCode, password)
            toast.success('Password reset successfully!')
            router.push('/login')
        } catch (error) {
            console.error('Password reset error:', error)
            if (error instanceof FirebaseError) {
                if (error.code === 'auth/expired-action-code') {
                    toast.error('Reset link has expired. Please request a new one.')
                } else if (error.code === 'auth/invalid-action-code') {
                    toast.error('Invalid reset link. Please request a new one.')
                } else {
                    toast.error('Failed to reset password. Please try again.')
                }
            } else {
                toast.error('An unexpected error occurred. Please try again later.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    if (!codeVerified) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="space-y-4 w-80 text-center">
                    <h1 className="text-2xl font-bold">Verifying Reset Link</h1>
                    <p className="text-gray-600">
                        Please wait while we verify your password reset link...
                    </p>
                </div>
            </div>
        )
    }

    if (!isValidCode) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="space-y-4 w-80 text-center">
                    <h1 className="text-2xl font-bold">Invalid Reset Link</h1>
                    <p className="text-gray-600">
                        This password reset link is invalid or has expired.
                    </p>
                    <Link href="/forgot-password" className="block">
                        <Button className="w-full">
                            Request New Reset Link
                        </Button>
                    </Link>
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
                    Enter your new password for <strong>{email}</strong>
                </p>
                <Input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
                <Input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required 
                />
                <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading ? 'Resetting...' : 'Reset Password'}
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

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center h-screen">
                <div className="space-y-4 w-80 text-center">
                    <h1 className="text-2xl font-bold">Loading...</h1>
                    <p className="text-gray-600">Please wait...</p>
                </div>
            </div>
        }>
            <ResetPasswordForm />
        </Suspense>
    )
}