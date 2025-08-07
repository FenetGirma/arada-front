"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Lightbulb, Target, Users, Zap } from 'lucide-react'

interface MapPin {
  id: string
  type: 'challenge' | 'solution'
  title: string
  location: string
  category: string
  participants: number
  x: number // percentage from left
  y: number // percentage from top
  status: 'active' | 'completed' | 'in-progress'
}

const mapPins: MapPin[] = [
  // North America
  { id: '1', type: 'challenge', title: 'NYC Tree Planting', location: 'New York, USA', category: 'Environment', participants: 234, x: 25, y: 35, status: 'active' },
  { id: '2', type: 'solution', title: 'Solar Panel Initiative', location: 'California, USA', category: 'Energy', participants: 156, x: 15, y: 40, status: 'completed' },
  { id: '3', type: 'challenge', title: 'Great Lakes Cleanup', location: 'Chicago, USA', category: 'Conservation', participants: 89, x: 28, y: 38, status: 'in-progress' },
  
  // Europe
  { id: '4', type: 'solution', title: 'Urban Gardens Network', location: 'Amsterdam, Netherlands', category: 'Community', participants: 312, x: 52, y: 28, status: 'completed' },
  { id: '5', type: 'challenge', title: 'Mediterranean Restoration', location: 'Barcelona, Spain', category: 'Conservation', participants: 445, x: 50, y: 35, status: 'active' },
  { id: '6', type: 'solution', title: 'Bike Share Expansion', location: 'Copenhagen, Denmark', category: 'Transport', participants: 678, x: 53, y: 25, status: 'completed' },
  
  // Asia
  { id: '7', type: 'challenge', title: 'Air Quality Monitoring', location: 'Tokyo, Japan', category: 'Environment', participants: 523, x: 85, y: 40, status: 'active' },
  { id: '8', type: 'solution', title: 'Vertical Farming Project', location: 'Singapore', category: 'Agriculture', participants: 234, x: 78, y: 55, status: 'in-progress' },
  { id: '9', type: 'challenge', title: 'Plastic-Free Initiative', location: 'Mumbai, India', category: 'Environment', participants: 789, x: 70, y: 48, status: 'active' },
  
  // Africa
  { id: '10', type: 'solution', title: 'Solar Water Pumps', location: 'Nairobi, Kenya', category: 'Energy', participants: 167, x: 58, y: 58, status: 'completed' },
  { id: '11', type: 'challenge', title: 'Desert Reforestation', location: 'Cairo, Egypt', category: 'Environment', participants: 345, x: 55, y: 45, status: 'in-progress' },
  
  // South America
  { id: '12', type: 'challenge', title: 'Amazon Conservation', location: 'Manaus, Brazil', category: 'Conservation', participants: 892, x: 35, y: 65, status: 'active' },
  { id: '13', type: 'solution', title: 'Eco-Tourism Network', location: 'Cusco, Peru', category: 'Community', participants: 234, x: 32, y: 68, status: 'completed' },
  
  // Australia
  { id: '14', type: 'challenge', title: 'Coral Reef Protection', location: 'Brisbane, Australia', category: 'Conservation', participants: 456, x: 88, y: 75, status: 'active' },
  { id: '15', type: 'solution', title: 'Renewable Energy Grid', location: 'Sydney, Australia', category: 'Energy', participants: 567, x: 90, y: 78, status: 'in-progress' }
]

export function InteractiveMap() {
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(null)
  const [filter, setFilter] = useState<'all' | 'challenge' | 'solution'>('all')
  const [hoveredPin, setHoveredPin] = useState<string | null>(null)

  const filteredPins = mapPins.filter(pin => filter === 'all' || pin.type === filter)

  const getPinColor = (pin: MapPin) => {
    if (pin.type === 'challenge') {
      switch (pin.status) {
        case 'active': return 'bg-emerald-500 border-emerald-600'
        case 'in-progress': return 'bg-yellow-500 border-yellow-600'
        case 'completed': return 'bg-blue-500 border-blue-600'
        default: return 'bg-emerald-500 border-emerald-600'
      }
    } else {
      return 'bg-purple-500 border-purple-600'
    }
  }

  const getPinIcon = (pin: MapPin) => {
    return pin.type === 'challenge' ? Target : Lightbulb
  }

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <div className="flex justify-center">
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
          <div className="flex space-x-2">
            {[
              { key: 'all', label: 'All', icon: MapPin },
              { key: 'challenge', label: 'Challenges', icon: Target },
              { key: 'solution', label: 'Solutions', icon: Lightbulb }
            ].map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={filter === key ? "default" : "ghost"}
                onClick={() => setFilter(key as any)}
                className={`rounded-xl px-4 py-2 text-sm ${
                  filter === key 
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

      {/* Interactive World Map */}
      <Card className="border-0 shadow-lg rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 to-emerald-50">
        <CardContent className="p-0">
          <div className="relative w-full h-96 md:h-[500px] bg-gradient-to-br from-blue-100 via-emerald-50 to-blue-100">
            {/* World Map Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg viewBox="0 0 1000 500" className="w-full h-full">
                {/* Simplified world map paths */}
                <path d="M150 200 Q200 180 250 200 L300 220 Q350 200 400 210 L450 200 Q500 190 550 200 L600 210 Q650 200 700 220 L750 200 Q800 190 850 200" 
                      stroke="currentColor" strokeWidth="2" fill="none" className="text-gray-400" />
                <path d="M100 250 Q150 230 200 250 L250 270 Q300 250 350 260 L400 250 Q450 240 500 250 L550 260 Q600 250 650 270 L700 250 Q750 240 800 250" 
                      stroke="currentColor" strokeWidth="2" fill="none" className="text-gray-400" />
                <path d="M200 300 Q250 280 300 300 L350 320 Q400 300 450 310 L500 300 Q550 290 600 300 L650 310 Q700 300 750 320" 
                      stroke="currentColor" strokeWidth="2" fill="none" className="text-gray-400" />
              </svg>
            </div>

            {/* Map Pins */}
            {filteredPins.map((pin) => {
              const Icon = getPinIcon(pin)
              const isHovered = hoveredPin === pin.id
              const isSelected = selectedPin?.id === pin.id
              
              return (
                <div
                  key={pin.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  onMouseEnter={() => setHoveredPin(pin.id)}
                  onMouseLeave={() => setHoveredPin(null)}
                  onClick={() => setSelectedPin(pin)}
                >
                  <div className={`relative ${isHovered || isSelected ? 'scale-125' : 'scale-100'} transition-transform duration-200`}>
                    <div className={`w-8 h-8 rounded-full border-2 ${getPinColor(pin)} shadow-lg flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    
                    {/* Pulse animation for active pins */}
                    {pin.status === 'active' && (
                      <div className={`absolute inset-0 rounded-full ${getPinColor(pin)} animate-ping opacity-20`} />
                    )}
                    
                    {/* Hover tooltip */}
                    {isHovered && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-10">
                        <div className="font-semibold">{pin.title}</div>
                        <div className="text-gray-300">{pin.location}</div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
              <div className="text-sm font-semibold text-gray-900 mb-2">Legend</div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-emerald-600" />
                  <span className="text-xs text-gray-700">Active Challenges</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-yellow-600" />
                  <span className="text-xs text-gray-700">In Progress</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-purple-500 border-2 border-purple-600" />
                  <span className="text-xs text-gray-700">Solutions</span>
                </div>
              </div>
            </div>

            {/* Stats overlay */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
              <div className="text-sm font-semibold text-gray-900 mb-2">Global Impact</div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs text-gray-700">{mapPins.filter(p => p.type === 'challenge').length} Challenges</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lightbulb className="w-4 h-4 text-purple-500" />
                  <span className="text-xs text-gray-700">{mapPins.filter(p => p.type === 'solution').length} Solutions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-gray-700">{mapPins.reduce((sum, p) => sum + p.participants, 0).toLocaleString()} Participants</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Pin Details */}
      {selectedPin && (
        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full border-2 ${getPinColor(selectedPin)} flex items-center justify-center`}>
                  {selectedPin.type === 'challenge' ? (
                    <Target className="w-5 h-5 text-white" />
                  ) : (
                    <Lightbulb className="w-5 h-5 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selectedPin.title}</h3>
                  <p className="text-sm text-gray-600">{selectedPin.location}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPin(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </Button>
            </div>
            
            <div className="flex items-center space-x-4 mb-4">
              <Badge className={`${
                selectedPin.type === 'challenge' ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'
              } border-0 rounded-full`}>
                {selectedPin.category}
              </Badge>
              <Badge className={`border-0 rounded-full ${
                selectedPin.status === 'active' ? 'bg-green-100 text-green-700' :
                selectedPin.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {selectedPin.status.replace('-', ' ')}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{selectedPin.participants} participants</span>
              </div>
              <Button className="bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-2xl px-6">
                {selectedPin.type === 'challenge' ? 'Join Challenge' : 'View Solution'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
