'use client';

import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Bot, User, Send, Loader2, X } from 'lucide-react';
import { schemeChatbot } from '@/ai/flows/chatbot-assistant';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hello! I am Sarkari Sahayak's AI assistant. How can I help you find the right government scheme today?", sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    setTimeout(scrollToBottom, 100);

    try {
      const result = await schemeChatbot({ query: input });
      const botMessage: Message = { id: (Date.now() + 1).toString(), text: result.response, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = { id: (Date.now() + 1).toString(), text: "Sorry, I encountered an error. Please try again.", sender: 'bot' };
      setMessages((prev) => [...prev, errorMessage]);
      console.error("Chatbot error:", error);
    } finally {
      setIsLoading(false);
      setTimeout(scrollToBottom, 100);
    }
  };
  
  if (!isOpen) {
    return (
       <Button
        onClick={() => setIsOpen(true)}
        size="icon"
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg"
        aria-label="Open AI Assistant"
      >
        <Bot className="h-8 w-8" />
      </Button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-[350px] h-[500px] flex flex-col shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between border-b">
           <div className="flex items-center gap-3">
             <Avatar className="h-10 w-10 border-2 border-primary">
                <AvatarFallback className="bg-primary/20">
                  <Bot className="h-5 w-5 text-primary" />
                </AvatarFallback>
              </Avatar>
            <div>
              <CardTitle className="text-lg font-headline">AI Assistant</CardTitle>
            </div>
           </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-full" ref={scrollAreaRef}>
            <div className="flex-1 space-y-6 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn('flex items-start gap-3', {
                    'justify-end': message.sender === 'user',
                  })}
                >
                  {message.sender === 'bot' && (
                    <Avatar className="h-8 w-8">
                       <AvatarFallback className="bg-primary/20">
                         <Bot className="h-4 w-4 text-primary" />
                       </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn('max-w-[75%] rounded-lg p-3 text-sm shadow-sm', {
                      'bg-primary text-primary-foreground': message.sender === 'user',
                      'bg-muted': message.sender === 'bot',
                    })}
                  >
                    {message.text}
                  </div>
                  {message.sender === 'user' && (
                     <Avatar className="h-8 w-8">
                        <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                     </Avatar>
                  )}
                </div>
              ))}
               {isLoading && (
                <div className="flex items-start gap-3">
                   <Avatar className="h-8 w-8">
                       <AvatarFallback className="bg-primary/20">
                         <Bot className="h-4 w-4 text-primary" />
                       </AvatarFallback>
                    </Avatar>
                  <div className="bg-muted rounded-lg p-3">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
         <CardFooter className="border-t pt-4">
            <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g., Which scholarships am I eligible for?"
                  className="min-h-[40px] flex-1 resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  <span className="sr-only">Send</span>
                </Button>
            </form>
         </CardFooter>
      </Card>
    </div>
  );
}
