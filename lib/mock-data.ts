export interface Product {
  id: string
  name: string
  price: number
  category: string
  aisle: string
  inStock: boolean
  image: string
  rating: number
  description: string
}

export interface StoreLocation {
  aisle: string
  section: string
  coordinates: { x: number; y: number }
}

export interface User {
  id: string
  name: string
  email: string
  loyaltyPoints: number
  purchaseHistory: string[]
  preferences: string[]
}

export const mockUser: User = {
  id: "user-1",
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  loyaltyPoints: 2450,
  purchaseHistory: ["milk", "bread", "eggs", "chicken", "apples"],
  preferences: ["organic", "gluten-free", "dairy"],
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Great Value Whole Milk",
    price: 3.48,
    category: "Dairy",
    aisle: "A12",
    inStock: true,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.5,
    description: "Fresh whole milk, 1 gallon",
  },
  {
    id: "2",
    name: "Wonder Bread Classic White",
    price: 1.98,
    category: "Bakery",
    aisle: "B8",
    inStock: true,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.2,
    description: "Soft white bread, 20 oz loaf",
  },
  {
    id: "3",
    name: "Organic Free Range Eggs",
    price: 4.97,
    category: "Dairy",
    aisle: "A12",
    inStock: false,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.8,
    description: "12 count large eggs",
  },
  {
    id: "4",
    name: "Tyson Chicken Breast",
    price: 8.97,
    category: "Meat",
    aisle: "C15",
    inStock: true,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.3,
    description: "Boneless skinless chicken breast, 2.5 lbs",
  },
  {
    id: "5",
    name: "Gala Apples",
    price: 2.48,
    category: "Produce",
    aisle: "D2",
    inStock: true,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.6,
    description: "Fresh Gala apples, 3 lb bag",
  },
  {
    id: "6",
    name: "Organic Bananas",
    price: 1.98,
    category: "Produce",
    aisle: "D2",
    inStock: true,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.4,
    description: "Organic bananas, per lb",
  },
]

export const storeLayout: Record<string, StoreLocation> = {
  A12: { aisle: "A12", section: "Dairy", coordinates: { x: 100, y: 200 } },
  B8: { aisle: "B8", section: "Bakery", coordinates: { x: 200, y: 150 } },
  C15: { aisle: "C15", section: "Meat", coordinates: { x: 300, y: 250 } },
  D2: { aisle: "D2", section: "Produce", coordinates: { x: 150, y: 100 } },
}

export const mockRecommendations = [
  { id: "6", reason: "Based on your healthy eating preferences" },
  { id: "3", reason: "You buy eggs regularly" },
  { id: "4", reason: "Pairs well with your current cart" },
]
