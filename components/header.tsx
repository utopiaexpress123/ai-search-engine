'use client'

import React from 'react'
import Link from 'next/link'
import { ModeToggle } from './mode-toggle'
import { IconLogo } from './ui/icons'
import { cn } from '@/lib/utils'
import logo from "/public/logo.png";


export const Header: React.FC = () => {
  return (
    <header className="fixed w-full p-0 md:p-2 flex justify-between items-center z-10 backdrop-blur md:backdrop-blur-none bg-background/80 md:bg-transparent">
      <div className="p-2">
        <Link href="https://utopia.express">
          <img width="93px" height="16px"
              src={logo.src}
              alt="Utopia Express"
              className="object-cover"
            />
        </Link>
      </div>
      <ModeToggle />
    </header>
  )
}

export default Header

