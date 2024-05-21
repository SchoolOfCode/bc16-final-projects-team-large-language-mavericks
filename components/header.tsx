import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { auth } from '@/auth'
import { Button, buttonVariants } from '@/components/ui/button'
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
        <></>
      )}
      <div className="flex items-center">
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant="ghost" asChild className="ml-0 font-extrabold">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </>
  )
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-start justify-around w-full h-24 px-4 shrink-0 bg-gradient-to-l from-pink-200 from-5% via-SoCblue via-60% to-SoCbrainblue backdrop-blur-xl">
      <div className="flex items-start justify-between w-[640px] my-auto">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>

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
          <span className="hidden ml-2 md:flex font-extrabold">
            Learn World
          </span>
        </a>

        <a
          target="_blank"
          href="https://socbrain.vercel.app/login"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'ghost' }))}
        >
          <Image
            className="dark:hidden"
            src="/SoCBrain_light.png"
            alt="SoCBrain logo"
            width={78}
            height={20}
          />
          <Image
            className="hidden dark:block"
            src="/SoCBrain_dark.png"
            alt="SoCBrain logo"
            width={78}
            height={20}
          />
        </a>
        <ThemeToggle />
      </div>
    </header>
  )
}
