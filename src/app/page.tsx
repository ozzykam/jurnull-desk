'use client'

// import { toast } from 'sonner'
// import { Button } from '@/components/ui/button'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="p-8 space-y-4">
        <h1 className="text-2xl font-bold">Welcome to JurNull 👋</h1>
        <p className="text-lg text-muted-foreground">
          We&apos;re working on something special for you! Stay tuned for updates!
        </p>

        {/* <Button onClick={() => toast.success('JurNull is alive 🚀')}>
          Test Toast
        </Button> */}
      </div>
    </ProtectedRoute>
  )
}