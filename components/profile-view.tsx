"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Star, Gift, Clock, TrendingUp, Settings, CreditCard } from "lucide-react"
import { mockUser } from "@/lib/mock-data"

export default function ProfileView() {
  const nextTierPoints = 3000
  const progressToNextTier = (mockUser.loyaltyPoints / nextTierPoints) * 100

  return (
    <div className="p-4 space-y-4">
      {/* User Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {mockUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{mockUser.name}</h2>
              <p className="text-gray-600">{mockUser.email}</p>
              <div className="flex items-center mt-2">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium">Gold Member</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loyalty Points */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-base">
            <Gift className="w-4 h-4 mr-2" />
            Loyalty Rewards
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{mockUser.loyaltyPoints}</div>
            <p className="text-sm text-gray-600">Points Available</p>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progress to Platinum</span>
              <span>{nextTierPoints - mockUser.loyaltyPoints} points to go</span>
            </div>
            <Progress value={progressToNextTier} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm">
              Redeem Points
            </Button>
            <Button variant="outline" size="sm">
              View Rewards
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Shopping Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-base">
            <TrendingUp className="w-4 h-4 mr-2" />
            Shopping Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">47</div>
              <p className="text-sm text-gray-600">Trips This Year</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">$1,247</div>
              <p className="text-sm text-gray-600">Total Saved</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Favorite Categories</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Produce</span>
                <Badge variant="secondary">32%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Dairy</span>
                <Badge variant="secondary">28%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Meat</span>
                <Badge variant="secondary">21%</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-base">
            <Clock className="w-4 h-4 mr-2" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-sm">Shopping Trip</p>
              <p className="text-xs text-gray-600">Yesterday, 3:45 PM</p>
            </div>
            <span className="text-sm font-medium">$47.83</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-sm">Points Earned</p>
              <p className="text-xs text-gray-600">2 days ago</p>
            </div>
            <span className="text-sm font-medium text-green-600">+95 pts</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-sm">Coupon Used</p>
              <p className="text-xs text-gray-600">1 week ago</p>
            </div>
            <span className="text-sm font-medium text-green-600">-$5.00</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="flex items-center justify-center py-3 bg-transparent">
          <CreditCard className="w-4 h-4 mr-2" />
          Payment Methods
        </Button>
        <Button variant="outline" className="flex items-center justify-center py-3 bg-transparent">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  )
}
