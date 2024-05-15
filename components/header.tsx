import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { auth } from '@/auth'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  IconNextChat,
  IconSeparator
} from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import { SidebarMobile } from './sidebar-mobile'
import { SidebarToggle } from './sidebar-toggle'
import { ChatHistory } from './chat-history'
import { Session } from '@/lib/types'
import { ThemeToggle } from '@/components/theme-toggle'
import Image from 'next/image'

async function UserOrLogin() {
  const session = (await auth()) as Session
  return (
    <>
      {session?.user ? (
        <>
          <SidebarMobile>
            <ChatHistory userId={session.user.id} />
          </SidebarMobile>
          <SidebarToggle />
        </>
      ) : (
        <Link href="/new" rel="nofollow" className={cn(buttonVariants({ variant: 'ghost' }))}>
          <IconNextChat className="size-6 mr-2" />
          
        </Link>
      )}
      <div className="flex items-center">
        <IconSeparator className="size-6 text-muted-foreground/50" />
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant="ghost" asChild className="ml-0">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </>
  )
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-start justify-between w-full h-24 px-4 shrink-0 bg-gradient-to-b from-SoCblue to-muted/50 backdrop-blur-xl pt-5">
      <div className="flex items-center">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>
      </div>
        
      <div className="flex items-center justify-end space-x-2 ">
        <a
          target="_blank"
          href="https://learn.schoolofcode.co.uk"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'ghost' }))}
        >
          <Image
          src="/soc_logo.png"
          alt="dark SoC logo"
          width={30}
          height={30}
        />
          <span className="hidden ml-2 md:flex">Learn World</span>
        </a>
        <ThemeToggle />
        </div>
    </header>
  )
}
