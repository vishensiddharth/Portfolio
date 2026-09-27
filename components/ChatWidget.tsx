'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

const SUGGESTED_PROMPTS = [
  'What is Sid doing at Under Armour?',
  'What did Sid build at Codilar?',
  'What is his core tech stack?',
  'How can I get in touch with Sid?',
]

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hi! I'm Sid's Portfolio AI. Ask me anything about his current role at Under Armour, past leadership at Codilar, tech stack, or projects!",
      timestamp: 'Just now',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [isOpen, messages, isLoading])

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim()
    if (!query || isLoading) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      })

      const data = await res.json()
      const assistantReply: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || "I'm having a little trouble connecting right now. Feel free to email Siddharth directly at vishensiddharth@gmail.com!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }

      setMessages(prev => [...prev, assistantReply])
    } catch (e) {
      console.error('Chat error:', e)
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Network hiccup! You can reach Siddharth directly at vishensiddharth@gmail.com.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* ── Floating Launcher Button (Bottom Right) ── */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open Sid's AI Chat"
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-300 shadow-2xl ${
            isOpen
              ? 'bg-surface border-accent text-accent shadow-[0_0_25px_rgba(0,212,255,0.4)]'
              : 'bg-[#080C14] border-accent/40 text-text hover:border-accent hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]'
          }`}
        >
          {/* Animated Avatar / Sparkle Icon */}
          <div className="relative w-6 h-6 rounded-full bg-gradient-to-tr from-accent to-accent2 flex items-center justify-center text-xs text-[#080C14] font-bold">
            🤖
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400 animate-pulse border border-[#080C14]" />
          </div>

          <span className="font-mono text-xs font-semibold tracking-wide">
            {isOpen ? 'Close' : 'Ask Sid AI'}
          </span>
        </motion.button>
      </div>

      {/* ── Chat Window Modal / Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[400px] h-[520px] max-h-[80vh] z-50 flex flex-col rounded-2xl border border-accent/25 bg-[rgba(8,12,20,0.96)] backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(0,212,255,0.1)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-gradient-to-r from-accent/10 via-transparent to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent/20 to-accent2/20 border border-accent/30 flex items-center justify-center text-sm shadow-[0_0_10px_rgba(0,212,255,0.2)]">
                  ⚡
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-sm font-bold text-text">Ask Sid</h3>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-accent/10 text-accent border border-accent/20">
                      AI v1.5
                    </span>
                  </div>
                  <p className="text-[10px] text-muted font-mono flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Trained on Siddharth&apos;s Resume
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    setMessages([
                      {
                        id: 'welcome',
                        role: 'assistant',
                        content: "Conversation reset! What would you like to know about Siddharth's work?",
                        timestamp: 'Just now',
                      },
                    ])
                  }
                  title="Clear conversation"
                  className="p-1.5 rounded-lg text-muted hover:text-text hover:bg-white/5 transition-colors text-xs"
                >
                  🔄
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="p-1.5 rounded-lg text-muted hover:text-text hover:bg-white/5 transition-colors text-xs font-mono"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-accent/15 border border-accent/30 flex-shrink-0 flex items-center justify-center text-[10px]">
                      ⚡
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-accent/15 border border-accent/30 text-text rounded-br-none shadow-[0_0_15px_rgba(0,212,255,0.08)]'
                        : 'bg-surface/80 border border-white/10 text-text/90 rounded-bl-none'
                    }`}
                  >
                    {msg.content}
                    <div
                      className={`text-[9px] font-mono mt-1 ${
                        msg.role === 'user' ? 'text-accent/60 text-right' : 'text-muted/60 text-left'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5 justify-start items-center">
                  <div className="w-6 h-6 rounded-full bg-accent/15 border border-accent/30 flex-shrink-0 flex items-center justify-center text-[10px]">
                    ⚡
                  </div>
                  <div className="px-4 py-2.5 rounded-2xl bg-surface/80 border border-white/10 flex items-center gap-1.5 text-accent">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts (visible when few messages) */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 border-t border-white/5 bg-black/20">
                <div className="text-[10px] font-mono text-muted/70 mb-1.5">Suggested Questions:</div>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(prompt)}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-surface border border-white/10 hover:border-accent/40 hover:text-accent text-muted transition-all text-left truncate max-w-full"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 border-t border-white/10 bg-[#080C14]">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 bg-surface/60 focus-within:border-accent/50 focus-within:shadow-[0_0_12px_rgba(0,212,255,0.2)] transition-all">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question about Sid..."
                  className="flex-1 bg-transparent border-none outline-none text-xs text-text placeholder-muted/60 font-mono py-1"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className="w-7 h-7 rounded-lg bg-accent text-[#080C14] font-bold flex items-center justify-center hover:bg-cyan-300 disabled:opacity-30 disabled:hover:bg-accent transition-all text-xs"
                >
                  ↑
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
