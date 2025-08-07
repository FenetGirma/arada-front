"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function CreateAccountForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Create account attempt:", { name, email, password })
    // Implement your account creation logic here
    alert("Account creation functionality not implemented yet. Check console for data.")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          className="border-gray-200 rounded-xl h-11 focus:ring-2 focus:ring-emerald-400/20 focus:border-emerald-400"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="border-gray-200 rounded-xl h-11 focus:ring-2 focus:ring-emerald-400/20 focus:border-emerald-400"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="border-gray-200 rounded-xl h-11 focus:ring-2 focus:ring-emerald-400/20 focus:border-emerald-400"
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-xl h-11 font-semibold shadow-md hover:shadow-lg transition-all duration-300"
      >
        Create Account
      </Button>
    </form>
  )
}
