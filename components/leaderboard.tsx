"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, TrendingUp, Users, Target } from 'lucide-react'

const leaderboardData = [
  {
    rank: 1,
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2847,
    challenges: 23,
    solutions: 45,
    badge: "Eco Champion",
    trend: "up"
  },
  {
    rank: 2,
    name: "Marcus Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2634,
    challenges: 19,
    solutions: 38,
    badge: "Green Leader",
    trend: "up"
  },
  {
    rank: 3,
    name: "Ocean Guardians",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2456,
    challenges: 15,
    solutions: 52,
    badge: "Organization",
    trend: "down"
  },
  {
    rank: 4,
    name: "Alex Rivera",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2234,
    challenges: 18,
    solutions: 29,
    badge: "Innovator",
    trend: "up"
  },
  {
    rank: 5,
    name: "Emma Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2156,
    challenges: 16,
    solutions: 34,
    badge: "Community Hero",
    trend: "up"
  },
  {
    rank: 6,
    name: "David Park",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 1987,
    challenges: 14,
    solutions: 27,
    badge: "Changemaker",
    trend: "same"
  },
  {
    rank: 7,
    name: "Lisa Wang",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 1876,
    challenges: 12,
    solutions: 31,
    badge: "Sustainability Expert",
    trend: "up"
  },
  {
    rank: 8,
    name: "Green Future Org",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 1743,
    challenges: 11,
    solutions: 25,
    badge: "Organization",
    trend: "down"
  }
]

export function Leaderboard() {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year' | 'all'>('month')

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">#{rank}</div>
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-emerald-500" />
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
      default:
        return <div className="w-4 h-4 rounded-full bg-gray-300" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Timeframe Selector */}
      <div className="flex justify-center">
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
          <div className="flex space-x-2">
            {[
              { key: 'week', label: 'This Week' },
              { key: 'month', label: 'This Month' },
              { key: 'year', label: 'This Year' },
              { key: 'all', label: 'All Time' }
            ].map(({ key, label }) => (
              <Button
                key={key}
                variant={timeframe === key ? "default" : "ghost"}
                onClick={() => setTimeframe(key as any)}
                className={`rounded-xl px-4 py-2 text-sm ${
                  timeframe === key 
                    ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {leaderboardData.slice(0, 3).map((user, index) => (
          <Card key={user.rank} className={`border-0 shadow-lg rounded-3xl overflow-hidden ${
            index === 0 ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 ring-2 ring-yellow-200' :
            index === 1 ? 'bg-gradient-to-br from-gray-50 to-gray-100 ring-2 ring-gray-200' :
            'bg-gradient-to-br from-amber-50 to-amber-100 ring-2 ring-amber-200'
          }`}>
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                {getRankIcon(user.rank)}
              </div>
              <Avatar className="w-20 h-20 mx-auto mb-4 ring-4 ring-white shadow-lg">
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-lg bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-700">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{user.name}</h3>
              <Badge className={`mb-4 border-0 ${
                index === 0 ? 'bg-yellow-200 text-yellow-800' :
                index === 1 ? 'bg-gray-200 text-gray-800' :
                'bg-amber-200 text-amber-800'
              }`}>
                {user.badge}
              </Badge>
              <div className="text-3xl font-bold text-gray-900 mb-2">{user.points.toLocaleString()}</div>
              <div className="text-sm text-gray-600">points</div>
              <div className="flex justify-center space-x-4 mt-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Target className="w-4 h-4" />
                  <span>{user.challenges}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{user.solutions}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full Leaderboard */}
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">Full Leaderboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {leaderboardData.map((user) => (
            <div key={user.rank} className="flex items-center justify-between p-4 hover:bg-gray-50/50 rounded-2xl transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10">
                  {getRankIcon(user.rank)}
                </div>
                <Avatar className="w-12 h-12 ring-2 ring-gray-100">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-700">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-900">{user.name}</h4>
                    {getTrendIcon(user.trend)}
                  </div>
                  <Badge className="bg-gray-100 text-gray-600 border-0 text-xs">
                    {user.badge}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center space-x-8">
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{user.points.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">points</div>
                </div>
                <div className="flex space-x-6 text-sm text-gray-600">
                  <div className="text-center">
                    <div className="font-semibold">{user.challenges}</div>
                    <div className="text-xs">challenges</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{user.solutions}</div>
                    <div className="text-xs">solutions</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
