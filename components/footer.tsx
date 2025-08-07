"use client"

import { Instagram, Facebook, Twitter, ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-8 px-8 lg:px-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        {/* Logo */}
        <div className="flex flex-col items-center md:items-start leading-none">
          <div className="flex items-baseline">
            <span className="font-serif text-4xl font-bold text-primary -mr-1">A</span>
            <span className="font-serif text-xl font-bold text-primary">rada</span>
          </div>
          <div className="flex items-baseline -mt-1">
            <span className="font-serif text-4xl font-bold text-primary -mr-1">C</span>
            <span className="font-serif text-xl font-bold text-primary">hallenges</span>
          </div>
        </div>

        {/* Copyright and Socials */}
        <div className="flex flex-col items-center md:flex-row md:space-x-8 space-y-4 md:space-y-0">
          <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Arada Challenges. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" className="rounded-full border border-gray-300 text-gray-600 hover:border-primary hover:text-primary transition-colors">
              <Instagram className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border border-gray-300 text-gray-600 hover:border-primary hover:text-primary transition-colors">
              <Facebook className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border border-gray-300 text-gray-600 hover:border-primary hover:text-primary transition-colors">
              <Twitter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Back to top */}
        <Button 
          variant="ghost" 
          onClick={scrollToTop} 
          className="text-gray-600 hover:text-primary flex items-center space-x-2 transition-colors"
        >
          <span>Back to top</span>
          <ArrowUp className="w-4 h-4" />
        </Button>
      </div>
    </footer>
  )
}
