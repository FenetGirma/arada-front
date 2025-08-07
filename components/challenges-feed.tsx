"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, MapPin, Users, Target, Lightbulb, Play, Pause } from 'lucide-react'
import Image from "next/image"

interface Challenge {
  id: string
  author: {
    name: string
    username: string
    avatar: string
    verified?: boolean
  }
  title: string
  description: string
  location: string
  category: string
  image: string
  video?: boolean
  likes: number
  comments: number
  shares: number
  bookmarks: number
  participants: number
  solutions: number
  timeAgo: string
  progress?: number
}

const challenges: Challenge[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Chen',
      username: 'saraheco',
      avatar: '/placeholder.svg?height=40&width=40',
      verified: true
    },
    title: 'Plant 1000 Trees Challenge',
    description: 'Join our mission to plant 1000 trees across Central Park this month. Every tree planted brings us closer to a greener NYC! 🌱',
    location: 'Central Park, NYC',
    category: 'Environment',
    image: '/placeholder.svg?height=400&width=400&text=Tree+Planting',
    likes: 2847,
    comments: 156,
    shares: 89,
    bookmarks: 234,
    participants: 456,
    solutions: 12,
    timeAgo: '2h',

    progress: 67
  },
  {
    id: '2',
    author: {
      name: 'Ocean Guardians',
      username: 'oceanprotect',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    title: 'Beach Cleanup Revolution',
    description: 'Transform our coastlines one beach at a time. This weekend we tackle Sunset Beach - bring gloves and join the movement! 🌊',
    location: 'Sunset Beach, CA',
    category: 'Conservation',
    image: '/placeholder.svg?height=400&width=400&text=Beach+Cleanup',
    video: true,
    likes: 1923,
    comments: 98,
    shares: 156,
    bookmarks: 187,
    participants: 234,
    solutions: 8,
    timeAgo: '4h',

  },
  {
    id: '3',
    author: {
      name: 'Marcus Johnson',
      username: 'urbangardener',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    title: 'Community Garden Network',
    description: 'Building sustainable food systems in urban areas. Help us create 50 community gardens across the city this year! 🥬',
    location: 'Brooklyn, NY',
    category: 'Community',
    image: '/placeholder.svg?height=400&width=400&text=Community+Garden',
    likes: 1456,
    comments: 67,
    shares: 43,
    bookmarks: 123,
    participants: 189,
    solutions: 15,
    timeAgo: '6h',
  
    progress: 34
  },
  {
    id: '4',
    author: {
      name: 'Alex Rivera',
      username: 'cyclelife',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    title: 'Car-Free City Initiative',
    description: 'Promoting sustainable transportation through cycling. Join our weekly rides and help reduce urban carbon emissions! 🚴‍♀️',
    location: 'Downtown Seattle',
    category: 'Transport',
    image: '/placeholder.svg?height=400&width=400&text=Cycling+Initiative',
    likes: 987,
    comments: 45,
    shares: 67,
    bookmarks: 89,
    participants: 123,
    solutions: 6,
    timeAgo: '8h',
   
  }
]

export function ChallengesFeed() {
  const [likedChallenges, setLikedChallenges] = useState<string[]>([])
  const [bookmarkedChallenges, setBookmarkedChallenges] = useState<string[]>([])
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)

  const handleLike = (challengeId: string) => {
    setLikedChallenges(prev => 
      prev.includes(challengeId) 
        ? prev.filter(id => id !== challengeId)
        : [...prev, challengeId]
    )
  }

  const handleBookmark = (challengeId: string) => {
    setBookmarkedChallenges(prev => 
      prev.includes(challengeId) 
        ? prev.filter(id => id !== challengeId)
        : [...prev, challengeId]
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'trending':
        return <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 rounded-full text-xs">🔥 Trending</Badge>
      case 'completed':
        return <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 rounded-full text-xs">✅ Completed</Badge>
      default:
        return <Badge className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-white border-0 rounded-full text-xs">🎯 Active</Badge>
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6 p-4">
      {challenges.map((challenge) => (
        <Card key={challenge.id} className="border-0 shadow-2xl rounded-3xl overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 backdrop-blur-xl">
          {/* Header */}
          <div className="p-4 pb-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-12 h-12 ring-2 ring-emerald-400/20">
                    <AvatarImage src={challenge.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-700 font-semibold">
                      {challenge.author.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {challenge.author.verified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-gray-900">{challenge.author.name}</h3>
                    {challenge.author.verified && (
                      <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">@{challenge.author.username}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-full hover:bg-gray-100">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>

            {/* Challenge Info */}
            <div className="space-y-3 mb-4">
            
              
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{challenge.location}</span>
                </div>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-0 rounded-full text-xs">
                  {challenge.category}
                </Badge>
              </div>

            </div>
          </div>

          {/* Image/Video */}
          <div className="relative">
            <Image
              src={challenge.image || "/placeholder.svg"}
              alt={challenge.title}
              width={400}
              height={400}
              className="w-full h-80 object-cover"
            />
            
            {/* Video Play Button */}
            {challenge.video && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  onClick={() => setPlayingVideo(playingVideo === challenge.id ? null : challenge.id)}
                  className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all duration-300"
                >
                  {playingVideo === challenge.id ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-1" />
                  )}
                </Button>
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            
            {/* Stats Overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-white text-sm font-medium">
                  <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                    <Users className="w-4 h-4" />
                    <span>{challenge.participants}</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                    <Lightbulb className="w-4 h-4" />
                    <span>{challenge.solutions}</span>
                  </div>
                </div>
                <div className="text-white text-sm font-medium bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                  {challenge.timeAgo}
                </div>
              </div>
            </div>
          </div>
              <p className="text-gray-700 leading-relaxed p-4">{challenge.description}</p>


          {/* Actions */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleLike(challenge.id)}
                  className="flex items-center space-x-2 group"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    likedChallenges.includes(challenge.id)
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 scale-110'
                      : 'bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-rose-500 group-hover:scale-110'
                  }`}>
                    <Heart 
                      className={`w-5 h-5 transition-all ${
                        likedChallenges.includes(challenge.id) 
                          ? 'fill-white text-white' 
                          : 'text-gray-600 group-hover:text-white'
                      }`} 
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {challenge.likes + (likedChallenges.includes(challenge.id) ? 1 : 0)}
                  </span>
                </button>

               

                <button className="flex items-center space-x-2 group">
                  <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-emerald-500 group-hover:scale-110 flex items-center justify-center transition-all duration-300">
                    <Share2 className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{challenge.shares}</span>
                </button>
              </div>

              <button
                onClick={() => handleBookmark(challenge.id)}
                className="group"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  bookmarkedChallenges.includes(challenge.id)
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 scale-110'
                    : 'bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-yellow-500 group-hover:to-orange-500 group-hover:scale-110'
                }`}>
                  <Bookmark 
                    className={`w-5 h-5 transition-all ${
                      bookmarkedChallenges.includes(challenge.id) 
                        ? 'fill-white text-white' 
                        : 'text-gray-600 group-hover:text-white'
                    }`} 
                  />
                </div>
              </button>
            </div>

            {/* Join Button */}
            <Button className="w-full mt-4 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-2xl h-12 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <Target className="w-5 h-5 mr-2" />
              Join Challenge
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
