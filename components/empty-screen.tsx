import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'
import Image from 'next/image'
import { Vortex } from './ui/vortex'

const imageStyle = {
  maxWidth: '13dvw'
}

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10">
      <div className="flex flex-col rounded-lg p-1 bg-black items-center gap-2">
        <Vortex
          backgroundColor="black"
          rangeY={100}
          particleCount={50}
          rangeSpeed={0.1}
          baseHue={120}
          className="flex items-center flex-col justify-center px-2 md:px-10 py-4 size-full"
        >
          <div className="flex flex-col rounded-lg items-center p-8">
            <h1 className="text-lg text-white font-semibold">
              Welcome to the School of Code AI Chatbot!
            </h1>
            <div className="flex flex-row items-center">
              <div className="flex flex-row h-4/5">
                <Image
                  src="/cat.png"
                  alt="cat logo"
                  width={80}
                  height={80}
                  style={{ ...imageStyle, animation: 'shakeRight 0.5s 3' }}
                />
                <Image
                  src="/chris.png"
                  alt="chris logo"
                  width={80}
                  height={80}
                  style={{ ...imageStyle, animation: 'shakeRight 0.5s 3' }}
                />
              </div>

              <Image
                src="/soc_logo.png"
                alt="SoC logo"
                width={100}
                height={100}
                style={imageStyle}
              />
              <div className="flex flex-row h-4/5">
                <Image
                  src="/loz_reverse.png"
                  alt="loz logo"
                  width={80}
                  height={80}
                  style={{ ...imageStyle, animation: 'shakeLeft 0.5s 3' }}
                />
                <Image
                  src="/tom_reverse.png"
                  alt="tom logo"
                  width={80}
                  height={80}
                  style={{ ...imageStyle, animation: 'shakeLeft 0.5s 3' }}
                />
              </div>
            </div>
          </div>
        </Vortex>
      </div>
    </div>
  )
}
