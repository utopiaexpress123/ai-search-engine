'use client'

import React from 'react'
import Link from 'next/link'
import { IconLogo } from './ui/icons'
import { cn } from '@/lib/utils'
import logo from "/public/logo.png";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";


export const Header: React.FC = () => {
  return (
    <header className="fixed w-full p-0 md:p-2 flex justify-between items-center z-10 backdrop-blur md:backdrop-blur-none bg-background/80 md:bg-transparent">
      <div className="ml-2 p-2 font-bold">
        Encore
      </div>
      <div className="mr-4">
        <SignedIn>
          {/* Mount the UserButton component */}
          <UserButton />
        </SignedIn>
      </div>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton/>
      </SignedOut>
    </header>
  )
}

export default Header

