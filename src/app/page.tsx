'use client'

import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    async function testFirestore() {
      try {
        const querySnapshot = await getDocs(collection(db, 'test'))
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${JSON.stringify(doc.data())}`)
        })
      } catch (err) {
        console.error('Firestore error:', err)
      }
    }
    testFirestore()
  }, [])

  return (
    <div className="p-8 text-xl">JurNull Firebase is wired up 🚀</div>
  )
}
