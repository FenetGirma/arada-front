"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, Flag, User, TrendingUp, Users, Target, Award } from 'lucide-react'
import { RealMap } from "./real-map"

const impactData = {
  global: {
    challenges: 12847,
    participants: 234567,
    solutions: 5678,
    countries: 89
  },
  national: {
    challenges: 1247,
    participants: 23456,
    solutions: 567,
    rank: 3
  },
  personal: {
    challenges: 12,
    solutions: 8,
    impact: 156,
    rank: 234
  }
}

const recentImpacts = [
  {
    title: "Central Park Tree Planting Initiative",
    location: "New York, USA",
    detailedAddress: "Sheep Meadow, Central Park, Manhattan, New York, USA",
    impact: "234 trees planted",
    participants: 89,
    date: "2 days ago",
    coordinates: "40.7794, -73.9632"
  },
  {
    title: "Golden Gate Park Beach Cleanup",
    location: "San Francisco, USA",
    detailedAddress: "Music Concourse, Golden Gate Park, San Francisco, California, USA",
    impact: "1.2 tons waste collected",
    participants: 156,
    date: "1 week ago",
    coordinates: "37.7694, -122.4862"
  },
  {
    title: "Thames River Community Garden",
    location: "London, UK",
    detailedAddress: "South Bank, Westminster, London, England, UK",
    impact: "500 sq ft garden created",
    participants: 45,
    date: "2 weeks ago",
    coordinates: "51.5007, -0.1246"
  }
]

export function ImpactMap() {
  const [activeView, setActiveView] = useState<'global' | 'national' | 'personal'>('global')

  return (
    <div className="space-y-8">
      {/* View Selector */}
      <div className="flex justify-center">
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
          <div className="flex space-x-2">
            {[
              { key: 'global', label: 'Global', icon: Globe },
              { key: 'national', label: 'National', icon: Flag },
              { key: 'personal', label: 'Personal', icon: User }
            ].map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={activeView === key ? "default" : "ghost"}
                onClick={() => setActiveView(key as any)}
                className={`rounded-xl px-6 py-2 ${
                  activeView === key 
                    ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Real Interactive Map */}
      <RealMap />

      {/* Impact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {activeView === 'global' && (
          <>
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                    <Target className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{impactData.global.challenges.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Global Challenges</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{impactData.global.participants.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Participants</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{impactData.global.solutions.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Solutions</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{impactData.global.countries}</div>
                    <div className="text-sm text-gray-600">Countries</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeView === 'national' && (
          <>
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                    <Target className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{impactData.national.challenges.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">National Challenges</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{impactData.national.participants.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Participants</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{impactData.national.solutions.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Solutions</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
                    <Award className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">#{impactData.national.rank}</div>
                    <div className="text-sm text-gray-600">National Rank</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeView === 'personal' && (
          <>
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                    <Target className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{impactData.personal.challenges}</div>
                    <div className="text-sm text-gray-600">Your Challenges</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{impactData.personal.solutions}</div>
                    <div className="text-sm text-gray-600">Solutions Created</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{impactData.personal.impact}</div>
                    <div className="text-sm text-gray-600">People Impacted</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
                    <Award className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">#{impactData.personal.rank}</div>
                    <div className="text-sm text-gray-600">Your Rank</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Recent Impact with Detailed Addresses */}
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Recent Impact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentImpacts.map((impact, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{impact.title}</h4>
                <p className="text-sm text-gray-600">{impact.location}</p>
                <p className="text-xs text-gray-500 mt-1">{impact.detailedAddress}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge className="bg-emerald-100 text-emerald-700 border-0 rounded-full">
                    {impact.impact}
                  </Badge>
                  <span className="text-sm text-gray-500">{impact.participants} participants</span>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {impact.date}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
