"use client";

import { useState } from "react";
import { Search, ShoppingBag, ChevronDown, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const router = useRouter();

  const toggleAuthModals = () => {
    setShowSignIn(!showSignIn);
    setShowCreateAccount(!showCreateAccount);
  };

  const handleCreateAccount = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const createUserDto = {
      name: formData.get("name") as string,
      username:
        formData.get("name")?.toString().toLowerCase().replace(/\s+/g, "") ||
        "",
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      password: formData.get("password") as string,
      profile: "",
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/user/create",
        createUserDto
      );
      console.log("User created:", response.data);
      setShowCreateAccount(false);
      // Set email and password for login modal
      setLoginEmail(createUserDto.email);
      setLoginPassword(createUserDto.password);
      // Open login modal
      setShowSignIn(true);
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create account. Please try again.");
    }
  };

  // Handle login form submission
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const loginDto = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        loginDto
      );
      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token);
      setShowSignIn(false);
      alert("Login successful!");
      // Redirect to challenges page
      router.push("/challenges");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="w-full py-6 px-8 lg:px-16 flex items-center justify-between relative z-20">
        <div className="flex items-center space-x-12">
          <div className="flex flex-col items-start leading-none">
            <div className="flex items-baseline">
              <span className="font-serif text-6xl font-bold text-primary -mr-2">
                A
              </span>
              <span className="font-serif text-3xl font-bold text-primary">
                rada
              </span>
            </div>
            <div className="flex items-baseline -mt-2">
              <span className="font-serif text-6xl font-bold text-primary -mr-2">
                C
              </span>
              <span className="font-serif text-3xl font-bold text-primary">
                hallenges
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <Button
            onClick={() => setShowCreateAccount(true)}
            className="bg-white text-primary rounded-lg px-6 py-2 text-base font-medium shadow-md transition-colors"
          >
            Create Account
          </Button>
          <Button
            onClick={() => setShowSignIn(true)}
            className="bg-leafy-button-green hover:bg-primary text-white rounded-lg px-6 py-2 text-base font-medium shadow-md transition-colors"
          >
            Sign In
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex relative overflow-hidden">
        <div className="flex-1 flex flex-col justify-between p-8 lg:p-16 relative z-10">
          <div className="max-w-2xl pt-24 pb-16">
            <h2 className="text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-primary">
              Harmony Grows Here.
            </h2>
            <div className="inline-block bg-yellow-50 px-4 py-2 rounded-md mb-8">
              <p className="text-xl text-gray-800 font-medium">
                Promote Clean Air in Your Home
              </p>
            </div>
            <p className="text-lg text-gray-700 max-w-xl mb-10 leading-relaxed">
              Explore our eco-friendly plant designs that enhance your space
              while promoting cleaner, fresher air indoors. Each plant is
              selected to improve indoor air quality naturally, creating a
              healthier environment for you.
            </p>
            <div className="flex space-x-4">
              <Button className="bg-leafy-button-green hover:bg-primary text-white rounded-lg px-8 py-3 text-lg font-medium shadow-md transition-colors">
                Shop now
              </Button>
              <Button
                variant="outline"
                className="border-leafy-button-green text-leafy-button-green hover:bg-leafy-button-green hover:text-white rounded-lg px-8 py-3 text-lg font-medium transition-colors flex items-center space-x-2"
              >
                <span>Explore</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-gray-500 text-lg font-medium pb-8">
            <span className="text-primary font-bold">01</span>
            <span>02</span>
            <span>03</span>
            <span>04</span>
            <span>05</span>
          </div>
        </div>
        <div className="w-1/3 bg-secondary relative flex items-center justify-center">
          <div className="absolute -left-1/4 top-1/2 transform -translate-y-1/2 w-[600px] h-[600px] z-10">
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="Potted plant"
              layout="fill"
              objectFit="contain"
              quality={100}
            />
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-white flex flex-col items-center justify-center space-y-8 text-leafy-social text-sm font-semibold uppercase tracking-widest transform rotate-90 origin-bottom-right translate-x-1/2 translate-y-1/2 z-30">
          <a
            href="#"
            className="hover:text-primary transition-colors whitespace-nowrap"
          >
            Facebook
          </a>
          <a
            href="#"
            className="hover:text-primary transition-colors whitespace-nowrap"
          >
            Instagram
          </a>
          <a
            href="#"
            className="hover:text-primary transition-colors whitespace-nowrap"
          >
            Twitter
          </a>
        </div>
      </main>

      {/* Stats Section */}
      <section className="py-20 md:py-28 bg-white px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-4">
              Challenges Completed
            </h4>
            <p className="text-6xl font-extrabold text-primary mb-4">500+</p>
            <p className="text-sm text-gray-600 max-w-xs mx-auto">
              We've successfully completed over 500 challenges, making a
              tangible difference worldwide.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-4">
              Active Participants
            </h4>
            <p className="text-6xl font-extrabold text-primary mb-4">14K</p>
            <p className="text-sm text-gray-600 max-w-xs mx-auto">
              Join our growing community of over 14,000 passionate individuals
              making an impact.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-4">
              Solutions Implemented
            </h4>
            <p className="text-6xl font-extrabold text-primary mb-4">1500+</p>
            <p className="text-sm text-gray-600 max-w-xs mx-auto">
              Our community has implemented over 1500 innovative solutions to
              global challenges.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-28 bg-white px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <div className="max-w-xl">
              <h3 className="text-5xl font-extrabold leading-tight mb-6 text-primary">
                Simple Steps to Your Impact Journey
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Discover how easy it is to make a difference with Arada
                Challenges. Our user-friendly process ensures a smooth,
                hassle-free experience from discovering challenges to seeing
                your impact.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-tertiary p-6 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold text-primary">
                    Discover Challenges
                  </h4>
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    01
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Explore a wide range of environmental and community challenges
                  near you or globally.
                </p>
              </div>
              <div className="bg-tertiary p-6 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold text-primary">
                    Join the Community
                  </h4>
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    02
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Connect with like-minded individuals and organizations
                  passionate about making a difference.
                </p>
              </div>
              <div className="bg-tertiary p-6 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold text-primary">
                    Propose Solutions
                  </h4>
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    03
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Share your innovative ideas and solutions to tackle pressing
                  issues effectively.
                </p>
              </div>
              <div className="bg-tertiary p-6 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold text-primary">
                    Track Your Impact
                  </h4>
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    04
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  See your contributions on the global impact map and climb the
                  leaderboard.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-8 lg:pl-16">
            <div className="relative w-full max-w-sm aspect-[9/19] rounded-[2.5rem] bg-gray-900 shadow-xl overflow-hidden">
              <div className="absolute inset-0 border-[10px] border-gray-950 rounded-[2.5rem] z-10 pointer-events-none" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-950 rounded-full z-20" />
              <Image
                src="/placeholder.svg?height=800&width=400"
                alt="Mobile app interface"
                layout="fill"
                objectFit="cover"
                className="rounded-[2rem]"
              />
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 py-3 text-lg font-semibold shadow-md transition-colors">
              Download App
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Create Account Modal */}
      {showCreateAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-8 relative overflow-hidden">
            <button
              onClick={() => setShowCreateAccount(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-primary transition-colors"
            >
              <X size={24} />
            </button>
            <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-primary mb-2">
                  Join Us
                </h3>
                <p className="text-gray-600">
                  Create your account to start making an impact
                </p>
              </div>
              <form className="space-y-4" onSubmit={handleCreateAccount}>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0911302353"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium"
                >
                  Create Account
                </Button>
              </form>
              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={toggleAuthModals}
                  className="text-primary font-medium hover:underline"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sign In Modal */}
      {showSignIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-8 relative overflow-hidden">
            <button
              onClick={() => setShowSignIn(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-primary transition-colors"
            >
              <X size={24} />
            </button>
            <div className="absolute top-0 left-0 w-full h-1 bg-secondary" />
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-primary mb-2">
                  Welcome Back
                </h3>
                <p className="text-gray-600">
                  Sign in to continue your impact journey
                </p>
              </div>
              <form className="space-y-4" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="your@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-secondary hover:bg-secondary/90 text-white py-3 rounded-lg font-medium"
                >
                  Sign In
                </Button>
              </form>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="w-full border-gray-300 hover:bg-gray-50 py-2 rounded-lg font-medium"
                >
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-300 hover:bg-gray-50 py-2 rounded-lg font-medium"
                >
                  Apple
                </Button>
              </div>
              <div className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={toggleAuthModals}
                  className="text-primary font-medium hover:underline"
                >
                  Create account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
