import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const exampleMessages = [
  {
    heading: 'A top 3 legnépszerűbb AI-alapú ügyfélszolgálati asszisztens',
    message: 'Melyik a top 3 legnépszerűbb AI-alapú ügyfélszolgálati asszisztens chatbot?'
  },
  {
    heading: 'Melyik a top 5 legizgalmasabb AI eszköz KKV-k számára 2024-ben?',
    message: 'Melyik a top 5 legizgalmasabb AI eszköz KKV-k számára 2024-ben?'
  },
  {
    heading: 'Ajánlj 5 új AI eszközt webshop tulajdonosok számára',
    message: 'Ajánlj 5 új AI eszközt webshop tulajdonosok számára'
  }
]
export function EmptyScreen({
  submitMessage,
  className
}: {
  submitMessage: (message: string) => void
  className?: string
}) {
  return (
    <div className={`mx-auto w-full transition-all ${className}`}>
      <div className="bg-transparent p-2">
        <div className="mt-4 flex flex-col items-start space-y-2 mb-4">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              name={message.message}
              onClick={async () => {
                submitMessage(message.message)
              }}
            >
              <ArrowRightIcon/>
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}


function ArrowRightIcon() {
  return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="mr-2 text-muted-foreground w-4 h-4 opacity-50">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
</svg>
  )
}


