import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      {...props}
    >
      Open source AI chatbot built for{' '}
      <ExternalLink href="https://learn.schoolofcode.co.uk/">
        School of Code
      </ExternalLink>
    </p>
  )
}

export function Footer() {
  return (
    <footer className="flex justify-center w-full">
      <div className="fixed bottom-0 z-0 flex items-start justify-self-center w-[636px] h-14 px-4 shrink-0 bg-transparent backdrop-blur-md pt-5 -ml-4"></div>
    </footer>
  )
}
