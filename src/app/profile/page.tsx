'use client'

import { useAuth } from '@/context/AuthContext'
import { db } from '@/lib/firebase'
import { doc, getDoc, Timestamp } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface UserProfile {
  uid: string
  email: string
  createdAt: Timestamp
}

export default function Profile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    if (!user) return

    const fetchProfile = async () => {
      const userRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(userRef)
      if (docSnap.exists()) {
        setProfile(docSnap.data() as UserProfile)
      }
    }

    fetchProfile()
  }, [user])

  if (!profile) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p>Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <Card>
        <CardContent className="p-6">
          <div className="mb-4">
            <strong>Email:</strong> {profile.email}
          </div>
          <div className="mb-4">
            <strong>UID:</strong> {profile.uid}
          </div>
          <div className="mb-4">
            <strong>Created:</strong>{' '}
            {profile.createdAt.toDate().toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
