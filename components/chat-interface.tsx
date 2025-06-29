"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Mic, MicOff, Bot, User } from "lucide-react"
import { mockProducts } from "@/lib/mock-data"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hi! I'm your Walmart shopping assistant. I can help you find products, check prices, get recommendations, or answer any questions about your shopping trip. What can I help you with today?",
      timestamp: new Date(),
      suggestions: [
        "Find organic milk",
        "Check my shopping list",
        "What's on sale today?",
        "Navigate to produce section",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const response = generateAIResponse(content)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string): { content: string; suggestions?: string[] } => {
    const input = userInput.toLowerCase()

    if (input.includes("milk")) {
      const milkProducts = mockProducts.filter((p) => p.name.toLowerCase().includes("milk"))
      return {
        content: `I found ${milkProducts.length} milk options for you! Great Value Whole Milk is available in Aisle A12 for $3.48. It's currently in stock and has a 4.5-star rating. Would you like me to guide you there?`,
        suggestions: ["Navigate to milk", "Add to cart", "Show alternatives", "Check nutrition info"],
      }
    }

    if (input.includes("sale") || input.includes("deals")) {
      return {
        content:
          "Here are today's best deals: 🔥 Gala Apples - 20% off ($2.48), Wonder Bread - Buy 2 Get 1 Free, Organic Bananas - $1.98/lb. Plus, you have a personalized 15% off coupon for organic products that expires today!",
        suggestions: ["Show all deals", "Apply my coupons", "Navigate to deals", "Save for later"],
      }
    }

    if (input.includes("list") || input.includes("shopping list")) {
      return {
        content:
          "Based on your purchase history, I've created a smart list: Milk ✓, Bread, Eggs (currently out of stock - would you like alternatives?), Chicken Breast, and Apples. I can guide you through the store efficiently to collect these items!",
        suggestions: ["Start guided shopping", "Edit list", "Check alternatives", "Optimize route"],
      }
    }

    if (input.includes("produce") || input.includes("fruits") || input.includes("vegetables")) {
      return {
        content:
          "The produce section is in Aisle D2, near the front entrance. Today's fresh picks include organic bananas ($1.98/lb) and Gala apples (20% off!). The section is currently well-stocked and I can guide you there with AR navigation.",
        suggestions: ["Navigate to produce", "Show fresh picks", "Check organic options", "See weekly specials"],
      }
    }

    return {
      content:
        "I'd be happy to help with that! I can assist you with finding products, checking prices, navigating the store, applying coupons, or answering questions about items. What specific information are you looking for?",
      suggestions: ["Find a product", "Check my cart", "Show store map", "Apply coupons"],
    }
  }

  const toggleVoice = () => {
    setIsListening(!isListening)
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setIsListening(false)
        handleSendMessage("Where can I find organic milk?")
      }, 3000)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`flex items-start space-x-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === "user" ? "bg-blue-600" : "bg-gray-600"
                }`}
              >
                {message.type === "user" ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div
                className={`rounded-lg p-3 ${
                  message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                {message.suggestions && (
                  <div className="mt-3 space-y-2">
                    {message.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="mr-2 mb-2 text-xs h-7 bg-transparent"
                        onClick={() => handleSendMessage(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Voice Listening Indicator */}
      {isListening && (
        <div className="px-4 py-2">
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-3">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-red-700">Listening... Speak now</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleVoice}
            className={isListening ? "bg-red-100 border-red-300" : ""}
          >
            {isListening ? <MicOff className="w-4 h-4 text-red-600" /> : <Mic className="w-4 h-4" />}
          </Button>
          <Input
            placeholder="Ask me anything about shopping..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
            className="flex-1"
          />
          <Button onClick={() => handleSendMessage(inputValue)} disabled={!inputValue.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
