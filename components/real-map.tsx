"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Lightbulb, Target, Users, ZoomIn, ZoomOut, Layers, Navigation, Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { GoogleMapsEmbed } from '@next/third-parties/google' // Import GoogleMapsEmbed [^1][^3][^4]

interface MapPin {
  id: string
  type: 'challenge' | 'solution'
  title: string
  location: string
  detailedAddress: string
  category: string
  participants: number
  lat: number
  lng: number
  status: 'active' | 'completed' | 'in-progress'
}

const mapPins: MapPin[] = [
  // New York Area - More specific locations
  { 
    id: '1', 
    type: 'challenge', 
    title: 'Central Park Tree Planting', 
    location: 'New York, USA', 
    detailedAddress: 'Sheep Meadow, Central Park, Manhattan, New York, USA',
    category: 'Environment', 
    participants: 234, 
    lat: 40.7794, 
    lng: -73.9632, 
    status: 'active' 
  },
  { 
    id: '2', 
    type: 'solution', 
    title: 'Brooklyn Community Garden', 
    location: 'Brooklyn, USA', 
    detailedAddress: '456 Atlantic Ave, Boerum Hill, Brooklyn, New York, USA',
    category: 'Community', 
    participants: 156, 
    lat: 40.6892, 
    lng: -73.9442, 
    status: 'completed' 
  },
  
  // San Francisco Bay Area
  { 
    id: '3', 
    type: 'challenge', 
    title: 'Golden Gate Park Cleanup', 
    location: 'San Francisco, USA', 
    detailedAddress: 'Music Concourse, Golden Gate Park, San Francisco, California, USA',
    category: 'Conservation', 
    participants: 189, 
    lat: 37.7694, 
    lng: -122.4862, 
    status: 'active' 
  },
  
  // London, UK
  { 
    id: '4', 
    type: 'solution', 
    title: 'Thames River Restoration', 
    location: 'London, UK', 
    detailedAddress: 'South Bank, Westminster, London, England, UK',
    category: 'Conservation', 
    participants: 312, 
    lat: 51.5007, 
    lng: -0.1246, 
    status: 'completed' 
  },
  
  // Tokyo, Japan
  { 
    id: '5', 
    type: 'challenge', 
    title: 'Shibuya Air Quality Monitor', 
    location: 'Tokyo, Japan', 
    detailedAddress: 'Shibuya Crossing, Shibuya, Tokyo, Japan',
    category: 'Environment', 
    participants: 523, 
    lat: 35.6598, 
    lng: 139.7006, 
    status: 'active' 
  },
  
  // Sydney, Australia
  { 
    id: '6', 
    type: 'solution', 
    title: 'Harbour Bridge Solar Initiative', 
    location: 'Sydney, Australia', 
    detailedAddress: 'Sydney Harbour Bridge, The Rocks, Sydney, New South Wales, Australia',
    category: 'Energy', 
    participants: 445, 
    lat: -33.8523, 
    lng: 151.2108, 
    status: 'in-progress' 
  },
  
  // Paris, France
  { 
    id: '7', 
    type: 'challenge', 
    title: 'Seine River Cleanup', 
    location: 'Paris, France', 
    detailedAddress: 'Pont Neuf, Île de la Cité, Paris, France',
    category: 'Conservation', 
    participants: 267, 
    lat: 48.8566, 
    lng: 2.3522, 
    status: 'active' 
  },
  
  // São Paulo, Brazil
  { 
    id: '8', 
    type: 'solution', 
    title: 'Urban Vertical Gardens', 
    location: 'São Paulo, Brazil', 
    detailedAddress: 'Avenida Paulista, Bela Vista, São Paulo, Brazil',
    category: 'Environment', 
    participants: 189, 
    lat: -23.5613, 
    lng: -46.6563, 
    status: 'completed' 
  }
]

export function RealMap() {
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(null)
  const [filter, setFilter] = useState<'all' | 'challenge' | 'solution'>('all')
  const [zoomLevel, setZoomLevel] = useState(2) // Initial zoom level
  const [searchQuery, setSearchQuery] = useState("")
  const [mapStyle, setMapStyle] = useState<'satellite' | 'terrain' | 'street'>('terrain')

  const filteredPins = mapPins.filter(pin => 
    (filter === 'all' || pin.type === filter) &&
    (searchQuery === '' || pin.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     pin.location.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const getMapType = (style: string) => {
    switch (style) {
      case 'satellite': return 'satellite'
      case 'street': return 'roadmap' // 'roadmap' is standard street view
      case 'terrain': return 'roadmap' // Fallback for terrain, as it's not a direct maptype for Embed API [^1][^3][^4]
      default: return 'roadmap'
    }
  }

  const getPinColor = (pin: MapPin) => {
    if (pin.type === 'challenge') {
      switch (pin.status) {
        case 'active': return 'bg-emerald-500 border-emerald-600 shadow-emerald-500/50'
        case 'in-progress': return 'bg-yellow-500 border-yellow-600 shadow-yellow-500/50'
        case 'completed': return 'bg-blue-500 border-blue-600 shadow-blue-500/50'
        default: return 'bg-emerald-500 border-emerald-600 shadow-emerald-500/50'
      }
    } else {
      return 'bg-purple-500 border-purple-600 shadow-purple-500/50'
    }
  }

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 20)) // Max zoom level for Google Maps is typically 20-21
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 1)) // Min zoom level
  }

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-2">
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

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64 border-gray-200 rounded-2xl h-10 focus:ring-2 focus:ring-emerald-400/20"
            />
          </div>

          {/* Map Style Toggle */}
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
            <div className="flex space-x-1">
              {[
                { key: 'terrain', label: 'Terrain' },
                { key: 'satellite', label: 'Satellite' },
                { key: 'street', label: 'Street' }
              ].map(({ key, label }) => (
                <Button
                  key={key}
                  variant={mapStyle === key ? "default" : "ghost"}
                  onClick={() => setMapStyle(key as any)}
                  className={`rounded-xl px-3 py-1 text-xs ${
                    mapStyle === key 
                      ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Real Map */}
      <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
        <CardContent className="p-0">
          <div className="relative w-full h-96 md:h-[600px]">
            <GoogleMapsEmbed
              apiKey="YOUR_GOOGLE_MAPS_API_KEY" // Replace with your actual Google Maps API key [^1][^3][^4]
              height="100%"
              width="100%"
              mode="place"
              q={selectedPin ? selectedPin.detailedAddress : "World"} // Query for selected pin or general world view
              maptype={getMapType(mapStyle)} // Map style [^1][^3][^4]
              zoom={zoomLevel} // Zoom level [^1][^3][^4]
              allowfullscreen={true}
              loading="lazy"
            />

            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-lg z-20">
              <div className="flex flex-col space-y-2">
                <Button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 20}
                  className="w-10 h-10 p-0 rounded-xl bg-white hover:bg-gray-50 border border-gray-200"
                >
                  <ZoomIn className="w-4 h-4 text-gray-600" />
                </Button>
                <div className="text-xs text-center text-gray-600 font-medium px-2">
                  {zoomLevel}x
                </div>
                <Button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1}
                  className="w-10 h-10 p-0 rounded-xl bg-white hover:bg-gray-50 border border-gray-200"
                >
                  <ZoomOut className="w-4 h-4 text-gray-600" />
                </Button>
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg z-20">
              <div className="text-sm font-semibold text-gray-900 mb-3">Legend</div>
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
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-blue-600" />
                  <span className="text-xs text-gray-700">Completed</span>
                </div>
              </div>
            </div>

            {/* Stats overlay */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg z-20">
              <div className="text-sm font-semibold text-gray-900 mb-3">Live Stats</div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs text-gray-700">{filteredPins.filter(p => p.type === 'challenge').length} Challenges</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lightbulb className="w-4 h-4 text-purple-500" />
                  <span className="text-xs text-gray-700">{filteredPins.filter(p => p.type === 'solution').length} Solutions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-gray-700">{filteredPins.reduce((sum, p) => sum + p.participants, 0).toLocaleString()} Participants</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Pin Details */}
      {selectedPin && (
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full border-2 ${getPinColor(selectedPin)} flex items-center justify-center`}>
                  {selectedPin.type === 'challenge' ? (
                    <Target className="w-6 h-6 text-white" />
                  ) : (
                    <Lightbulb className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedPin.title}</h3>
                  <p className="text-sm text-gray-600">{selectedPin.location}</p>
                  <p className="text-xs text-gray-500 mt-1">{selectedPin.detailedAddress}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPin(null)}
                className="text-gray-400 hover:text-gray-600 rounded-full"
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
              <div className="text-xs text-gray-500">
                📍 {selectedPin.lat.toFixed(4)}, {selectedPin.lng.toFixed(4)}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">{selectedPin.participants} participants</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Navigation className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Get Directions</span>
                </div>
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
