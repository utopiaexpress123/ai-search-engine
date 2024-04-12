'use client'

import { cn } from '@/lib/utils'
import {
  BookCheck,
  Image,
  MessageCircleMore,
  Newspaper,
  Repeat2,
  Search
} from 'lucide-react'
import React from 'react'
import { Separator } from './ui/separator'

type SectionProps = {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
  title?: string
  separator?: boolean
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  size = 'md',
  title,
  separator = false
}) => {
  let icon: React.ReactNode
  switch (title) {
    case 'Images':
      // eslint-disable-next-line jsx-a11y/alt-text
      icon = <Image size={16} className="mr-2 text-slate-400" />
      break
    case 'Sources':
      icon = <Newspaper size={16} className="mr-2 text-slate-400" />
      break
    case 'Answer':
      icon = <BookCheck size={16} className="mr-2 text-slate-400" />
      break
    case 'Related':
      icon = <Repeat2 size={16} className="mr-2 text-slate-400" />
      break
    case 'Follow-up':
      icon = <MessageCircleMore size={16} className="mr-2 text-slate-400" />
      break
    default:
      icon = <Search size={16} className="mr-2 text-slate-400" />
  }

  return (
    <>
      {separator && <Separator className="my-4 bg-primary/10" />}
      <section
        className={cn(
          ` ${size === 'sm' ? 'py-1' : size === 'lg' ? 'py-4' : 'py-2'}`,
          className
        )}
      >
        {title && (
          <h2 className="flex items-center text-md text-slate-400 leading-none py-4">
            {icon}
            {title}
          </h2>
        )}
        {children}
      </section>
    </>
  )
}
