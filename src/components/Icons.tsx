'use client'
// @ts-nocheck
import React from 'react'

export const Icon = ({ children, size = 20, ...rest }: any) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none"
       stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...rest}>
    {children}
  </svg>
)

export const IconArrowRight = (p: any) => <Icon {...p}><path d="M5 12h14M13 5l7 7-7 7"/></Icon>
export const IconCheck      = (p: any) => <Icon {...p}><path d="M20 6 9 17l-5-5"/></Icon>
export const IconX          = (p: any) => <Icon {...p}><path d="M18 6 6 18M6 6l12 12"/></Icon>
export const IconShield     = (p: any) => <Icon {...p}><path d="M12 22s8-4 8-12V5l-8-3-8 3v5c0 8 8 12 8 12z"/></Icon>
export const IconMonitor    = (p: any) => <Icon {...p}><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></Icon>
export const IconPhone      = (p: any) => <Icon {...p}><rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/></Icon>
export const IconSparkles   = (p: any) => <Icon {...p}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></Icon>
export const IconTrend      = (p: any) => <Icon {...p}><path d="M3 3v18h18"/><path d="m7 14 4-4 4 4 5-5"/></Icon>
export const IconClock      = (p: any) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Icon>
export const IconStar       = (p: any) => <Icon {...p}><path d="M12 2l3 7 7.5.6-5.7 5 1.8 7.4L12 18l-6.6 4 1.8-7.4L1.5 9.6 9 9z"/></Icon>
export const IconCompass    = (p: any) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="m16 8-2.6 6.4L7 17l2.6-6.4z"/></Icon>
export const IconChevDown   = (p: any) => <Icon {...p}><path d="m6 9 6 6 6-6"/></Icon>
export const IconLightbulb  = (p: any) => <Icon {...p}><path d="M9 18h6M10 22h4M12 2a6 6 0 0 0-3.7 10.7c.7.6 1.2 1.4 1.4 2.3h4.6c.2-.9.7-1.7 1.4-2.3A6 6 0 0 0 12 2z"/></Icon>
export const IconLayers     = (p: any) => <Icon {...p}><path d="m12 2 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></Icon>
export const IconScale      = (p: any) => <Icon {...p}><path d="M12 3v18M6 7h12M3 11l3-4 3 4M15 11l3-4 3 4M3 11h6M15 11h6"/></Icon>
export const IconCog        = (p: any) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></Icon>
