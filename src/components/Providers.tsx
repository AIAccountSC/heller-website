'use client'
import React from 'react'
import { ThemeProvider, LangProvider } from '@/lib/app-state'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LangProvider>{children}</LangProvider>
    </ThemeProvider>
  )
}
