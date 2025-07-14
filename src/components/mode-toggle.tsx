'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ModeToggle({type}:{type:string}) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {type=="smbutton" && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? <Moon /> : <Sun />}
        </Button>
      )}
      {type=="fullbutton" && (
        <Button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          variant="ghost" className="w-full justify-start"
        >
          {theme === 'light' ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />} {theme === 'light' ? "Dark" : "Light"}
        </Button>
      )}
    </>
  )
}
