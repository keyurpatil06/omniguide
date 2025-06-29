"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ShoppingCart, MapPin, Mic, User, Star } from "lucide-react"
import { mockUser } from "@/lib/mock-data"
import ARNavigationView from "@/components/ar-navigation"
import ChatInterface from "@/components/chat-interface"
import CartView from "@/components/cart-view"
import ProfileView from "@/components/profile-view"

export default function WalmartOmniGuide() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentView, setCurrentView] = useState<"login" | "store-entry" | "shopping">("login")

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-800">W</span>
            </div>
            <CardTitle className="text-2xl font-bold text-blue-800">Walmart OmniGuide</CardTitle>
            <p className="text-gray-600">Redefining retail convenience with smart, immersive tech</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Email" type="email" />
            <Input placeholder="Password" type="password" />
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                setIsLoggedIn(true)
                setCurrentView("store-entry")
              }}
            >
              Sign In
            </Button>
            <div className="text-center text-sm text-gray-500">Demo Mode - Click Sign In to continue</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentView === "store-entry") {
    return <StoreEntry onEnterStore={() => setCurrentView("shopping")} />
  }

  return <ShoppingInterface />
}

function StoreEntry({ onEnterStore }: { onEnterStore: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Welcome, {mockUser.name}!</h1>
            <div className="flex items-center text-yellow-600">
              <Star className="w-4 h-4 mr-1" />
              <span className="text-sm">{mockUser.loyaltyPoints} pts</span>
            </div>
          </div>
          <p className="text-gray-600 mb-6">Ready to start your smart shopping experience?</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Walmart Supercenter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">123 Main Street, Your City</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Current Shoppers:</span>
                <span className="text-green-600">Low Traffic 🟢</span>
              </div>
              <div className="flex justify-between">
                <span>Avg. Checkout Time:</span>
                <span>3 minutes</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button className="w-full bg-blue-600 hover:bg-blue-700 py-3" onClick={onEnterStore}>
          Enter Store & Start Shopping
        </Button>
      </div>
    </div>
  )
}

function ShoppingInterface() {
  const [activeTab, setActiveTab] = useState<"navigate" | "chat" | "cart" | "profile">("navigate")

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-blue-800">OmniGuide</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Aisle B8</span>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </header>

      <main className="pb-20">
        {activeTab === "navigate" && <ARNavigationView />}
        {activeTab === "chat" && <ChatInterface />}
        {activeTab === "cart" && <CartView />}
        {activeTab === "profile" && <ProfileView />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          {[
            { id: "navigate", icon: MapPin, label: "Navigate" },
            { id: "chat", icon: Mic, label: "Assistant" },
            { id: "cart", icon: ShoppingCart, label: "Cart" },
            { id: "profile", icon: User, label: "Profile" },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex flex-col items-center py-2 px-4 ${activeTab === id ? "text-blue-600" : "text-gray-500"}`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
