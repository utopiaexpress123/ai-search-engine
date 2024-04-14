import { useEffect, useState, useRef } from 'react'
import type { AI } from '@/app/action'
import { useUIState, useActions, useAIState } from 'ai/rsc'
import { cn } from '@/lib/utils'
import { UserMessage } from './user-message'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ArrowRight, Plus, Square } from 'lucide-react'
import { EmptyScreen } from './empty-screen'

export function ChatPanel() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useUIState<typeof AI>()
  const [aiMessages, setAiMessages] = useAIState<typeof AI>()
  const { submit } = useActions<typeof AI>()
  const [isButtonPressed, setIsButtonPressed] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [showEmptyScreen, setShowEmptyScreen] = useState(false)
  // Focus on input when button is pressed
  useEffect(() => {
    if (isButtonPressed) {
      inputRef.current?.focus()
      setIsButtonPressed(false)
    }
  }, [isButtonPressed])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Clear messages if button is pressed
    if (isButtonPressed) {
      handleClear()
      setIsButtonPressed(false)
    }

    // Add user message to UI state
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: Date.now(),
        isGenerating: false,
        component: <UserMessage message={input} />
      }
    ])

    // Submit and get response message
    const formData = new FormData(e.currentTarget)
    const responseMessage = await submit(formData)
    setMessages(currentMessages => [...currentMessages, responseMessage as any])

    setInput('')
  }

  // Clear messages
  const handleClear = () => {
    setIsButtonPressed(true)
    setMessages([])
    setAiMessages([])
  }

  useEffect(() => {
    // focus on input when the page loads
    inputRef.current?.focus()
  }, [])

  // If there are messages and the new button has not been pressed, display the new Button
  if (messages.length > 0 && !isButtonPressed) {
    return (
      <div className="fixed bottom-2 md:bottom-8 left-0 right-0 flex justify-center items-center mx-auto">
        <Button
          type="button"
          variant={'secondary'}
          className="rounded-full bg-secondary/80 group transition-all hover:scale-105"
          onClick={() => handleClear()}
        >
          <span className="text-sm mr-2 group-hover:block hidden animate-in fade-in duration-300">
            New
          </span>
          <Plus size={18} className="group-hover:rotate-90 transition-all" />
        </Button>
      </div>
    )
  }

  // Condition 1 and 3: If there are no messages or the button is pressed, display the form
  const formPositionClass =
    messages.length === 0
      ? 'fixed bottom-8 left-0 right-0 top-10 mx-auto h-screen flex flex-col items-center justify-center'
      : 'fixed bottom-8-ml-6'
  return (
    <div className={formPositionClass}>
      {/* <IconKuroko className="w-6 h-6 mb-4" /> */}
      <form onSubmit={handleSubmit} className="max-w-2xl w-full px-6">
        <div className="relative flex items-center w-full">
          <Input
            ref={inputRef}
            type="text"
            name="input"
            placeholder="Ask something"
            value={input}
            className="focus:ring-0 outline-none focus:outline-none transition-all pl-4 pr-10 h-14 rounded-full bg-muted shadow-2xl shadow-slate-600/10 hover:shadow-fuchsia-900/10 hover:shadow-xl"
            onChange={e => {
              setInput(e.target.value)
              setShowEmptyScreen(e.target.value.length === 0)
            }}
            onFocus={() => setShowEmptyScreen(true)}
            onBlur={() => setShowEmptyScreen(false)}
          />
          <Button
            type="submit"
            size={'icon'}
            variant={'outline'}
            className="rounded-full absolute right-2 top-1/2 transform -translate-y-1/2"
            disabled={input.length === 0}
          >
            <SearchIcon/>
          </Button>
        </div>
        <EmptyScreen
          submitMessage={message => {
            setInput(message)
          }}
          className={cn(showEmptyScreen ? 'visible' : 'visible')}
        />
      </form>
    </div>
  )
}


function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-fuchsia-300 hover:text-fuchsia-400">
      <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
    </svg>
  
  )
}


