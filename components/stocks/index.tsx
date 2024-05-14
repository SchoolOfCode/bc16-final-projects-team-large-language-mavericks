'use client'

import dynamic from 'next/dynamic'
import { EventsSkeleton } from './events-skeleton'

export { spinner } from './spinner'
export { BotCard, BotMessage, SystemMessage } from './message'


const Purchase = dynamic(
  () => import('./stock-purchase').then(mod => mod.Purchase),
  {
    ssr: false,
    loading: () => (
      <div className="h-[375px] rounded-xl border bg-zinc-950 p-4 text-green-400 sm:h-[314px]" />
    )
  }
)


const Events = dynamic(() => import('./events').then(mod => mod.Events), {
  ssr: false,
  loading: () => <EventsSkeleton />
})

export { Purchase, Events }
