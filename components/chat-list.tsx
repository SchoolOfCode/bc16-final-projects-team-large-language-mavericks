import { Separator } from '@/components/ui/separator'
import { UIState } from '@/lib/chat/actions'
import { Session } from '@/lib/types'
import Link from 'next/link'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

export interface ChatList {
  messages: UIState
  session?: Session
  isShared: boolean
}

export function ChatList({ messages, session, isShared }: ChatList) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4 pt-10">
      {!isShared && !session ? (
        <>
          <div className="group relative flex items-start md:-ml-10 my-5">
            <div className="bg-background hidden md:flex size-[60px] shrink-0 select-none items-center justify-center rounded-md border shadow-sm">
              <ExclamationTriangleIcon />
            </div>
            <div className="ml-2 space-y-2 overflow-hidden bg-SoCbrain dark:bg-slate-800 rounded-3xl p-5 text-white">
              <p className="text-muted-foreground leading-normal">
                Please{' '}
                <Link href="/login" className="underline">
                  log in
                </Link>{' '}
                or{' '}
                <Link href="/signup" className="underline">
                  sign up
                </Link>{' '}
                to save and revisit your chat history!
              </p>
            </div>
          </div>
        </>
      ) : null}

      {messages.map((message, index) => (
        <div key={message.id}>
          {message.display}
          {index < messages.length - 1}
        </div>
      ))}
    </div>
  )
}
