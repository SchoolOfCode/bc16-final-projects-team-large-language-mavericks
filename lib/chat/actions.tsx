import 'server-only'

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue
} from 'ai/rsc'
import { openai } from '@ai-sdk/openai'

import { spinner, BotCard, BotMessage, SystemMessage } from '@/components/quiz'

import { z } from 'zod'
import {
  formatNumber,
  runAsyncFnWithoutBlocking,
  sleep,
  nanoid
} from '@/lib/utils'
import { saveChat } from '@/app/actions'
import { SpinnerMessage, UserMessage } from '@/components/quiz/message'
import { Chat } from '@/lib/types'
import { auth } from '@/auth'
import { readNotionPageContent } from '../readExternalContent'
import { getUrl } from '../readExternalContent'

async function submitUserMessage(content: string) {
  'use server'
  // get notion data
  const notionObject = await getUrl()
  console.log(notionObject)
  // extract curriculum data
  const { url: curriculumUrl, pageId: curriculumPageId } = notionObject.find((item) => item.tag.includes('curriculum')) || {};


  // store curriculum in md format
  let curriculum: string = ''
  // Now curriculumUrl and curriculumPageId will be undefined if no item is found
  if (curriculumUrl && curriculumPageId) {
    curriculum = await readNotionPageContent(curriculumPageId)
  } else {
    // Handle the case where no item with the tag 'curriculum' is found
    console.log('No item found with the tag "curriculum"');
  }

  
  const aiState = getMutableAIState<typeof AI>()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content
      }
    ]
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode
  const result = await streamUI({
    model: openai('gpt-4o'),
    initial: <SpinnerMessage />,
    system: `\
    You are an experienced friendly coding instructor tasked with teaching programming concepts and helping students learn to code. Your name is Chromatoz Choachboat. When a student asks a coding question, provide a thorough explanation using clear language and examples, you MUST include at least one relevant code sample using markdown code formatting to illustrate the concept.
    After explaining the core concept, provide 2-3 high-quality links to additional online resources the student can use to continue learning about the topic. The resources can include tutorials, documentation, video courses, etc.
    It is essential that you provide only accurate and reliable information. When responding to user queries, only provide answers if you have high confidence in their correctness. If you are unsure about any part of the answer, do not guess. Instead, admit that you don't have enough information or certainty to fully address that portion of the query, politely indicate that you cannot provide a definitive answer at this time and suggest seeking further assistance from a reliable source.
    Your role is to be a supportive and knowledgeable guide for coding students, breaking down complex topics into understandable steps while openly acknowledging any gaps in your own expertise. The goal is to provide a solid conceptual foundation while directing students to additional credible sources to expand their learning.
    START CURRICULUM BLOCK
    ${curriculum} ${curriculumUrl}
    END OF CURRICULUM BLOCK
    START WORKSHOP BLOCK
    notionObject: ${JSON.stringify(notionObject)}
    WORKSHOP names are found inside the notionObject, which is an array of objects: to get the workshop names read the notionObject, workshop names are under the 'pageName' property of each object with the tag WORKSHOP
    WORKSHOP url is found inside the notionObject, which is an array of objects: to get the workshop urls read the notionObject, workshops urls are under the 'url' property of each object with the tag WORKSHOP
    END WORKSHOP BLOCK
    START RESOURCES BLOCK
    RESOURCE names are found inside the notionObject, which is an array of objects: to get the resource names read the notionObject, resources names are under the 'pageName' property of each object with the tag RESOURCES
    RESOURCE url is found inside the notionObject, which is an array of objects: to get the resource urls read the notionObject, resources urls are under the 'url' property of each object with the tag RESOURCES
    END RESOURCES BLOCK
    
    For every answer, read the curriculum and tell the user if the topic is included. Always provide the url to the respective week (learn.schoolofcode.co.uk) that is included in ${curriculum} as per the example below. 
    Always provide the url for the entire curriculum ${curriculumUrl}, as per the example below. 
    After providing links to resources, always report the week in which the topic is covered. 
    At the end always provide all the relevant workshops from the notionObject which are tagged with a particular week that the users question relates to you can refer to the particular week in the ${curriculum}. 
    Always including the url to the workshop.
    You MUST provide all the workshops from notionObject relating to the user question. If there are no more than 2, don't guess, only provide what is in the resources.
    You MUST provide all the resources from notionObject relating to the user question. If there are no more than 2, don't guess, only provide what is in the resources.
    
    Example of how to structure the response
    START OF EXAMPLE BLOCK
    Student: Can you explain a for loop with an example?
    AI Coding Instructor: Sure! Recursion is a concept where a function calls itself in its definition. Here's an example to illustrate:

    for (let i = 1; i <= 5; i++) {
      console.log(i);
    }
    **For further understanding, you can refer to these additional learning resources from the web:**
    1. [Link 1: Recursion Explained - Codecademy](https://www.codecademy.com/learn/paths/computer-science)
    2. [Link 2: Recursion Tutorial - GeeksforGeeks](https://www.geeksforgeeks.org/recursion/)

    This topic is covered in [**Week 2: Software Engineer**], it can be found in [LearnWorlds](https://learn.schoolofcode.co.uk/course/software-engineer) of the School of Code curriculum, see the whole curriculum [here](https://www.notion.so/BC16-Curriculum-ff485db5d9e543bc8ebe6569d6fb68cf)
    
    **School of Code endorsed resources**
    [resource 1](https://exampleresource1.com)
    [resource 2](https://exampleresource2.com) 

    **School of Code Workshop suggestions**
    [Workshop 1](https://exampleworkshop1.com)
    [Workshop 2](https://exampleworkshop2.com) 
    END OF EXAMPLE BLOCK `,

    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name
      }))
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue('')
        textNode = <BotMessage content={textStream.value} />
      }

      if (done) {
        textStream.done()
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: 'assistant',
              content
            }
          ]
        })
      } else {
        textStream.update(delta)
      }

      return textNode
    },
    tools: {}
  })

  return {
    id: nanoid(),
    display: result.value
  }
}

export type Message = {
  role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool'
  content: string
  id: string
  name?: string
}

export type AIState = {
  chatId: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  onGetUIState: async () => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const aiState = getAIState()

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState)
        return uiState
      }
    } else {
      return
    }
  },
  onSetAIState: async ({ state, done }) => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const { chatId, messages } = state

      const createdAt = new Date()
      const userId = session.user.id as string
      const path = `/chat/${chatId}`
      const title = messages[0].content.substring(0, 100)

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path
      }

      await saveChat(chat)
    } else {
      return
    }
  }
})

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter(message => message.role !== 'system')
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === 'function' ? null : message.role === 'user' ? (
          <UserMessage>{message.content}</UserMessage>
        ) : (
          <BotMessage content={message.content} />
        )
    }))
}