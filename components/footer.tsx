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
      Open source AI chatbot built for {' '}
      <ExternalLink href="https://learn.schoolofcode.co.uk/">School of Code</ExternalLink>
    </p>
  )
}


export function Footer () {
return (
  <footer className="fixed bottom-0 z-50 flex items-start justify-between w-full h-12 px-4 shrink-0 bg-gradient-to-b from-muted/50 to-SoCblue backdrop-blur-xl pt-5">
  
  </footer>
)
}