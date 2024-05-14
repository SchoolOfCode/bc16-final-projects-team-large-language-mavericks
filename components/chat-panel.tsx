import * as React from 'react'

import { shareChat } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconShare } from '@/components/ui/icons'
import { FooterText } from '@/components/footer'
import { ChatShareDialog } from '@/components/chat-share-dialog'
import { useAIState, useActions, useUIState } from 'ai/rsc'
import type { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { UserMessage } from './stocks/message'

export interface ChatPanelProps {
  id?: string
  title?: string
  input: string
  setInput: (value: string) => void
  isAtBottom: boolean
  scrollToBottom: () => void
}

export function ChatPanel({
  id,
  title,
  input,
  setInput,
  isAtBottom,
  scrollToBottom
}: ChatPanelProps) {
  const [aiState] = useAIState()
  const [messages, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)

  const exampleMessages = [
    { key: 1, message: `What are the primitive data types in JavaScript?` },
    { key: 2, message: 'Can you provide a simple explanation of hooks in React?' },
    { key: 3, message: `How do you set up an Express server in Node.js?` },
    { key: 4, message: `What are some advantages of TypeScript?` },
    { key: 5, message: `Explain useReducer in React` },
    { key: 6, message: `What is the difference between let and const in JavaScript?` },
    { key: 7, message: `How do you handle asynchronous operations in JavaScript?` },
    { key: 8, message: `What is the purpose of the <head> and <body> tags in HTML?` },
    { key: 9, message: `Explain the box model in CSS and how it works.` },
    { key: 10, message: `How do you create a responsive layout using CSS?` },
    { key: 11, message: `What is the difference between interfaces and classes in TypeScript?` },
    { key: 12, message: `How do you handle routing in a Node.js application using Express?` },
    { key: 13, message: `What is the purpose of middleware in Express?` },
    { key: 14, message: `How do you create and manage state in a React application?` },
    { key: 15, message: `Explain the concept of server-side rendering (SSR) in Next.js.` },
    { key: 16, message: `How do you handle file uploads in a Node.js application?` },
    { key: 17, message: `What is the purpose of SQL JOIN operations in PostgreSQL?` },
    { key: 18, message: `How do you write unit tests for React components?` },
    { key: 19, message: `What is the difference between integration testing and end-to-end testing?` },
    { key: 20, message: `How do you implement continuous integration and continuous deployment (CI/CD) in a web application?` },
    { key: 21, message: `What is the event loop in JavaScript and how does it work?` },
    { key: 22, message: `How do you optimize performance in React applications?` },
    { key: 23, message: `Explain the concept of closures in JavaScript.` },
    { key: 24, message: `What is the purpose of the alt attribute in HTML?` },
    { key: 25, message: `How do you style pseudo-elements in CSS?` },
    { key: 26, message: `What is the difference between npm and yarn in Node.js?` },
    { key: 27, message: `How do you handle authentication and authorization in a Node.js application?` },
    { key: 28, message: `What is the purpose of the React.memo higher-order component?` },
    { key: 29, message: `How do you handle form submissions in a Next.js application?` },
    { key: 30, message: `What is the purpose of database indexing in PostgreSQL?` },
    { key: 31, message: `How do you mock dependencies in unit tests?` },
    { key: 32, message: `What is the difference between shallow rendering and full rendering in React testing?` },
    { key: 33, message: `How do you implement server-side caching in a Node.js application?` },
    { key: 34, message: `What is the purpose of the key prop in React lists?` },
    { key: 35, message: `Explain the concept of higher-order components (HOCs) in React.` },
    { key: 36, message: `How do you implement pagination in a React application?` },
    { key: 37, message: `What is the purpose of the defer attribute in HTML?` },
    { key: 38, message: `How do you implement responsive images in HTML and CSS?` },
    { key: 39, message: `What is the purpose of the useCallback hook in React?` },
    { key: 40, message: `How do you handle database transactions in PostgreSQL?` },
  ]

  function randomNumbers() {
    let randomNumber: Set<number> = new Set()
    //get 4 unique numbers
    while (randomNumber.size < 4) {
      randomNumber.add(Math.floor(Math.random() * exampleMessages.length))
    }
    let randomChoice: { key: number; message: string }[] = []
    randomNumber.forEach((value) => {
      randomChoice.push(exampleMessages[value])
    })
    return randomChoice
  }
const randomQuestions = randomNumbers()

  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />

      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="mb-4 grid gap-2 px-4 sm:px-0">
          {messages.length === 0 &&
            randomQuestions.map((example, index) => (
              <div
                key={example.key}
                className={`cursor-pointer rounded-lg border bg-white p-2 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                  index > 1 && 'hidden md:block'
                }`}
                onClick={async () => {
                  setMessages(currentMessages => [
                    ...currentMessages,
                    {
                      id: nanoid(),
                      display: <UserMessage>{example.message}</UserMessage>
                    }
                  ])

                  const responseMessage = await submitUserMessage(
                    example.message
                  )

                  setMessages(currentMessages => [
                    ...currentMessages,
                    responseMessage
                  ])
                }}
              >
                <div className="text-sm font-semibold">
                  {example.message} 
                </div>
              </div>
            ))}
        </div>

        {/* {messages?.length >= 2 ? (
          <div className="flex h-12 items-center justify-center">
            <div className="flex space-x-2">
              {id && title ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setShareDialogOpen(true)}
                  >
                    <IconShare className="mr-2" />
                    Share
                  </Button>
                  <ChatShareDialog
                    open={shareDialogOpen}
                    onOpenChange={setShareDialogOpen}
                    onCopy={() => setShareDialogOpen(false)}
                    shareChat={shareChat}
                    chat={{
                      id,
                      title,
                      messages: aiState.messages
                    }}
                  />
                </>
              ) : null}
            </div>
          </div>
        ) : null} */}

        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm input={input} setInput={setInput} />
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  )
}
