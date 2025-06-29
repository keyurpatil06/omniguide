"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Navigation, Search, MapPin, Clock, Star } from "lucide-react"
import { mockProducts, mockRecommendations, type Product } from "@/lib/mock-data"

export default function ARNavigationView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isNavigating, setIsNavigating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const navigationSteps = [
    "Head towards the back of the store",
    "Turn right at the pharmacy",
    "Walk straight for 50 feet",
    "Turn left into Aisle A12",
    "Your item is on the right side, middle shelf",
  ]

  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const recommendedProducts = mockProducts.filter((product) => mockRecommendations.some((rec) => rec.id === product.id))

  useEffect(() => {
    if (isNavigating && currentStep < navigationSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isNavigating, currentStep])

  return (
    <div className="p-4 space-y-4">
      {/* AR Camera View Simulation */}
      <div className="relative bg-gray-900 rounded-lg overflow-hidden h-64">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
        <div className="absolute top-4 left-4 right-4">
          <div className="bg-black/70 text-white px-3 py-2 rounded-lg text-sm">📱 AR Camera View Active</div>
        </div>

        {isNavigating && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-blue-600 text-white p-3 rounded-lg">
              <div className="flex items-center mb-2">
                <Navigation className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">
                  Step {currentStep + 1} of {navigationSteps.length}
                </span>
              </div>
              <p className="text-sm">{navigationSteps[currentStep]}</p>
              <div className="mt-2 bg-white/20 rounded-full h-2">
                <div
                  className="bg-white rounded-full h-2 transition-all duration-1000"
                  style={{ width: `${((currentStep + 1) / navigationSteps.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {selectedProduct && !isNavigating && (
          <div className="absolute bottom-4 left-4 right-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{selectedProduct.name}</h3>
                  <Badge variant={selectedProduct.inStock ? "default" : "destructive"}>
                    {selectedProduct.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">${selectedProduct.price}</span>
                  <Button size="sm" onClick={() => setIsNavigating(true)} disabled={!selectedProduct.inStock}>
                    Navigate to {selectedProduct.aisle}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search products or ask me anything..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="flex items-center justify-center py-3 bg-transparent">
          <MapPin className="w-4 h-4 mr-2" />
          Store Map
        </Button>
        <Button variant="outline" className="flex items-center justify-center py-3 bg-transparent">
          <Clock className="w-4 h-4 mr-2" />
          My List
        </Button>
      </div>

      {/* Recommendations */}
      {!searchQuery && (
        <div>
          <h3 className="font-medium mb-3">Recommended for You</h3>
          <div className="space-y-3">
            {recommendedProducts.map((product) => (
              <Card key={product.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{product.name}</h4>
                      <div className="flex items-center mt-1">
                        <span className="text-green-600 font-bold">${product.price}</span>
                        <span className="text-xs text-gray-500 ml-2">Aisle {product.aisle}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Star className="w-3 h-3 text-yellow-500 mr-1" />
                        <span className="text-xs text-gray-600">{product.rating}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => setSelectedProduct(product)}>
                      Find
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchQuery && (
        <div>
          <h3 className="font-medium mb-3">Search Results</h3>
          <div className="space-y-3">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{product.name}</h4>
                      <div className="flex items-center mt-1">
                        <span className="text-green-600 font-bold">${product.price}</span>
                        <Badge variant={product.inStock ? "default" : "destructive"} className="ml-2 text-xs">
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-500">Aisle {product.aisle}</span>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => setSelectedProduct(product)}>
                      Navigate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
