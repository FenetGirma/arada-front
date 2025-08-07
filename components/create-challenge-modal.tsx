"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Upload, X, Navigation } from 'lucide-react'

interface CreateChallengeModalProps {
  children: React.ReactNode
}

export function CreateChallengeModal({ children }: CreateChallengeModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    detailedAddress: "",
    category: "",
    image: null as File | null
  })
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationDetails, setLocationDetails] = useState<any>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating challenge:", formData)
    // Here you would typically send the data to your backend
    setOpen(false)
    setFormData({
      title: "",
      description: "",
      location: "",
      detailedAddress: "",
      category: "",
      image: null
    })
    setLocationDetails(null)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, image: file }))
    }
  }

  const getCurrentLocation = () => {
    setLocationLoading(true)
    
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.')
      setLocationLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        
        try {
          // Use a more detailed reverse geocoding service
          const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
          const data = await response.json()
          
          // Construct basic location (City, Country)
          const basicLocation = `${data.city || data.locality || 'Unknown City'}, ${data.countryName || 'Unknown Country'}`
          
          // Construct detailed address (street, neighborhood, city, country)
          const addressParts = [];
          let streetPart = '';
          if (data.streetNumber) streetPart += `${data.streetNumber} `;
          if (data.streetName) streetPart += data.streetName;
          if (streetPart) addressParts.push(streetPart.trim());

          if (data.neighbourhood) {
              addressParts.push(data.neighbourhood);
          } else if (data.suburb) { // Use suburb if no specific neighborhood
              addressParts.push(data.suburb);
          }
          
          if (data.city) {
              addressParts.push(data.city);
          } else if (data.locality) { // Fallback to locality if no city
              addressParts.push(data.locality);
          }
          
          if (data.countryName) {
              addressParts.push(data.countryName);
          }

          const detailedAddress = addressParts.filter(Boolean).join(', ');

          setFormData(prev => ({ 
            ...prev, 
            location: basicLocation,
            detailedAddress: detailedAddress
          }))
          
          setLocationDetails({
            coordinates: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
            accuracy: position.coords.accuracy,
            fullData: data
          })
          
        } catch (error) {
          console.error('Geocoding error:', error)
          // Fallback to coordinates
          const coordLocation = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
          setFormData(prev => ({ 
            ...prev, 
            location: coordLocation,
            detailedAddress: coordLocation
          }))
          setLocationDetails({
            coordinates: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
            accuracy: position.coords.accuracy
          })
        }
        
        setLocationLoading(false)
      },
      (error) => {
        console.error('Error getting location:', error)
        let errorMessage = 'Unable to retrieve your location. '
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Location access denied by user.'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information unavailable.'
            break
          case error.TIMEOUT:
            errorMessage += 'Location request timed out.'
            break
          default:
            errorMessage += 'Unknown error occurred.'
            break
        }
        alert(errorMessage + ' Please enter manually.')
        setLocationLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl border-0 rounded-3xl bg-white/95 backdrop-blur-md max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-bold text-gray-900">Create New Challenge</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold text-gray-700">Challenge Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter a compelling challenge title..."
              className="border-gray-200 rounded-2xl h-12 focus:ring-2 focus:ring-emerald-400/20 focus:border-emerald-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold text-gray-700">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your challenge and its impact..."
              className="border-gray-200 rounded-2xl min-h-32 focus:ring-2 focus:ring-emerald-400/20 focus:border-emerald-400 resize-none"
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold text-gray-700">Location</Label>
              <Button
                type="button"
                variant="outline"
                onClick={getCurrentLocation}
                disabled={locationLoading}
                className="rounded-2xl px-4 h-10 border-gray-200 hover:border-emerald-400 text-sm"
              >
                {locationLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mr-2" />
                    Getting location...
                  </>
                ) : (
                  <>
                    <Navigation className="w-4 h-4 mr-2" />
                    Use My Location
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="City, Country"
                  className="pl-10 border-gray-200 rounded-2xl h-12 focus:ring-2 focus:ring-emerald-400/20 focus:border-emerald-400"
                  required
                />
              </div>

              <Input
                id="detailedAddress"
                value={formData.detailedAddress}
                onChange={(e) => setFormData(prev => ({ ...prev, detailedAddress: e.target.value }))}
                placeholder="Street, neighborhood, city, country (auto-filled)"
                className="border-gray-200 rounded-2xl h-12 focus:ring-2 focus:ring-emerald-400/20 focus:border-emerald-400"
              />
            </div>

            {locationDetails && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                <div className="text-sm text-emerald-800">
                  <div className="font-semibold mb-2">📍 Location Details:</div>
                  <div className="space-y-1">
                    <div><strong>Coordinates:</strong> {locationDetails.coordinates}</div>
                    <div><strong>Accuracy:</strong> ±{Math.round(locationDetails.accuracy)}m</div>
                    {locationDetails.fullData?.neighbourhood && (
                      <div><strong>Neighborhood:</strong> {locationDetails.fullData.neighbourhood}</div>
                    )}
                    {locationDetails.fullData?.suburb && (
                      <div><strong>Suburb/District:</strong> {locationDetails.fullData.suburb}</div>
                    )}
                    {locationDetails.fullData?.postcode && (
                      <div><strong>Postal Code:</strong> {locationDetails.fullData.postcode}</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-semibold text-gray-700">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className="border-gray-200 rounded-2xl h-12 focus:ring-2 focus:ring-emerald-400/20 focus:border-emerald-400">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-gray-200">
                <SelectItem value="environment">🌱 Environment</SelectItem>
                <SelectItem value="community">🤝 Community</SelectItem>
                <SelectItem value="conservation">🌊 Conservation</SelectItem>
                <SelectItem value="transport">🚴 Transport</SelectItem>
                <SelectItem value="education">📚 Education</SelectItem>
                <SelectItem value="health">💚 Health</SelectItem>
                <SelectItem value="technology">💻 Technology</SelectItem>
                <SelectItem value="arts">🎨 Arts & Culture</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-sm font-semibold text-gray-700">Challenge Image</Label>
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-emerald-400 transition-colors">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label htmlFor="image" className="cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  {formData.image ? formData.image.name : "Click to upload an image"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: High-quality images work best
                </p>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-2xl px-6 border-gray-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-2xl px-8"
            >
              Create Challenge
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
