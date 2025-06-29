"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plus, Minus, Trash2, CreditCard, Smartphone, Tag } from "lucide-react"
import { mockProducts } from "@/lib/mock-data"

interface CartItem {
  product: (typeof mockProducts)[0]
  quantity: number
}

export default function CartView() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: mockProducts[0], quantity: 1 }, // Milk
    { product: mockProducts[1], quantity: 2 }, // Bread
    { product: mockProducts[4], quantity: 1 }, // Apples
  ])
  const [appliedCoupons, setAppliedCoupons] = useState<string[]>(["ORGANIC15"])
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.product.id !== productId))
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.product.id === productId ? { ...item, quantity: newQuantity } : item)),
      )
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const discount = appliedCoupons.includes("ORGANIC15") ? subtotal * 0.15 : 0
  const tax = (subtotal - discount) * 0.08
  const total = subtotal - discount + tax

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false)
      // In a real app, this would navigate to a success page
      alert("Order placed successfully! You can now exit the store.")
    }, 3000)
  }

  if (isCheckingOut) {
    return (
      <div className="p-4 flex items-center justify-center min-h-[50vh]">
        <Card className="w-full max-w-sm">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>
            <h3 className="font-semibold mb-2">Processing Payment</h3>
            <p className="text-sm text-gray-600 mb-4">Using your saved Walmart Pay method</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Scanning cart items...</span>
                <span className="text-green-600">✓</span>
              </div>
              <div className="flex justify-between">
                <span>Applying coupons...</span>
                <span className="text-green-600">✓</span>
              </div>
              <div className="flex justify-between">
                <span>Processing payment...</span>
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4">
      {/* Smart Cart Detection */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-green-800">Smart Cart Active</h3>
              <p className="text-sm text-green-600">Items automatically detected as you shop</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </CardContent>
      </Card>

      {/* Cart Items */}
      <div className="space-y-3">
        {cartItems.map((item) => (
          <Card key={item.product.id}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <img
                  src={item.product.image || "/placeholder.svg"}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.product.name}</h4>
                  <p className="text-sm text-gray-600">{item.product.description}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-green-600 font-bold">${item.product.price}</span>
                    {item.product.category === "Produce" && appliedCoupons.includes("ORGANIC15") && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        15% off applied
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-red-600 hover:text-red-700 bg-transparent"
                    onClick={() => updateQuantity(item.product.id, 0)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Coupons & Deals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-base">
            <Tag className="w-4 h-4 mr-2" />
            Coupons & Deals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
            <div>
              <span className="text-sm font-medium text-green-800">ORGANIC15</span>
              <p className="text-xs text-green-600">15% off organic products</p>
            </div>
            <Badge variant="secondary">Applied</Badge>
          </div>
          <Button variant="outline" size="sm" className="w-full bg-transparent">
            + Add More Coupons
          </Button>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Savings</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Checkout Button */}
      <div className="space-y-3">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 py-3" onClick={handleCheckout}>
          <Smartphone className="w-4 h-4 mr-2" />
          Pay with Walmart Pay
        </Button>
        <p className="text-xs text-center text-gray-500">
          Walk out when done - payment will be processed automatically
        </p>
      </div>
    </div>
  )
}
