"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MapPin,
  Users,
  Lightbulb,
  Play,
  Pause,
  PlusCircle,
  ImageIcon,
  MapPinIcon,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Leaf,
  Zap,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

interface Challenge {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    verified?: boolean;
  };
  title: string;
  description: string;
  location: string;
  category: string;
  image: string;
  video?: boolean;
  likes: number;
  shares: number;
  bookmarks: number;
  participants: number;
  solutions: number;
  timeAgo: string;
}

interface Solution {
  id: string;
  author: {
    name: string;
    avatar: string;
    verified?: boolean;
  };
  description: string;
  image?: string;
  likes: number;
  comments: number;
  timeAgo: string;
  isVerified?: boolean;
}

const initialChallenges: Challenge[] = [
  {
    id: "1",
    author: {
      name: "Eco Warriors",
      username: "ecowarriors",
      avatar: "/placeholder.svg?height=40&width=40&text=EW",
      verified: true,
    },
    title: "Urban Tree Planting Initiative",
    description:
      "Join us in planting 1000 native trees across the city to improve air quality and create green spaces for communities.",
    location: "New York, NY",
    category: "Environment",
    image: "/placeholder.svg?height=400&width=400&text=Tree+Planting",
    likes: 245,
    shares: 56,
    bookmarks: 32,
    participants: 128,
    solutions: 18,
    timeAgo: "2 days ago",
  },
  {
    id: "2",
    author: {
      name: "Clean Ocean",
      username: "cleanocean",
      avatar: "/placeholder.svg?height=40&width=40&text=CO",
      verified: true,
    },
    title: "Beach Cleanup Challenge",
    description:
      "Help us remove 500kg of plastic waste from local beaches. Every piece counts towards a cleaner ocean!",
    location: "Miami, FL",
    category: "Conservation",
    image: "/placeholder.svg?height=400&width=400&text=Beach+Cleanup",
    likes: 189,
    shares: 42,
    bookmarks: 25,
    participants: 96,
    solutions: 12,
    timeAgo: "1 week ago",
  },
];

export function ChallengesFeed() {
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [likedChallenges, setLikedChallenges] = useState<string[]>([]);
  const [bookmarkedChallenges, setBookmarkedChallenges] = useState<string[]>(
    []
  );
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [expandedSolutions, setExpandedSolutions] = useState<string | null>(
    null
  );
  const [newSolutionText, setNewSolutionText] = useState("");
  const [activeSolutionInput, setActiveSolutionInput] = useState<string | null>(
    null
  );

  // State for modal inputs
  const [newChallengeTitle, setNewChallengeTitle] = useState("");
  const [newChallengeDescription, setNewChallengeDescription] = useState("");
  const [newChallengeLocation, setNewChallengeLocation] = useState("");
  const [newChallengeImageFile, setNewChallengeImageFile] =
    useState<File | null>(null);

  const handleLike = (challengeId: string) => {
    setLikedChallenges((prev) =>
      prev.includes(challengeId)
        ? prev.filter((id) => id !== challengeId)
        : [...prev, challengeId]
    );
  };

  const handleBookmark = (challengeId: string) => {
    setBookmarkedChallenges((prev) =>
      prev.includes(challengeId)
        ? prev.filter((id) => id !== challengeId)
        : [...prev, challengeId]
    );
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setNewChallengeLocation(
            `Lat: ${position.coords.latitude.toFixed(
              4
            )}, Lon: ${position.coords.longitude.toFixed(4)}`
          );
        },
        (error) => {
          console.error("Geolocation error:", error);
          setNewChallengeLocation("Unable to retrieve location");
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setNewChallengeLocation("Geolocation not supported by your browser");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNewChallengeImageFile(event.target.files[0]);
    }
  };

  const handleCreateChallengeSubmit = async () => {
    const formData = new FormData();
    formData.append("title", newChallengeTitle);
    formData.append("description", newChallengeDescription);
    formData.append("location", newChallengeLocation);
    formData.append("category", "New");
    if (newChallengeImageFile) {
      formData.append("image", newChallengeImageFile);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3001/challenge/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        }
      );

      const newChallenge: Challenge = {
        id: response.data.id,
        author: {
          name: "You",
          username: "yourusername",
          avatar: "/placeholder.svg?height=40&width=40&text=User",
        },
        title: response.data.title,
        description: response.data.description,
        location: response.data.location,
        category: response.data.category || "New",
        image:
          response.data.image ||
          "/placeholder.svg?height=400&width=400&text=No+Image",
        likes: 0,
        shares: 0,
        bookmarks: 0,
        participants: 0,
        solutions: 0,
        timeAgo: "Just now",
      };

      setChallenges((prev) => [newChallenge, ...prev]);
      setNewChallengeTitle("");
      setNewChallengeDescription("");
      setNewChallengeLocation("");
      setNewChallengeImageFile(null);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating challenge:", error);
    }
  };

  const toggleSolutions = (challengeId: string) => {
    setExpandedSolutions(
      expandedSolutions === challengeId ? null : challengeId
    );
  };

  const handleSolutionSubmit = (challengeId: string) => {
    if (!newSolutionText.trim()) return;

    const newSolution: Solution = {
      id: `sol-${Date.now()}`,
      author: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40&text=User",
        verified: true,
      },
      description: newSolutionText,
      likes: 0,
      comments: 0,
      timeAgo: "Just now",
    };

    setChallenges((prev) =>
      prev.map((challenge) => {
        if (challenge.id === challengeId) {
          return {
            ...challenge,
            solutions: challenge.solutions + 1,
          };
        }
        return challenge;
      })
    );

    setNewSolutionText("");
    setActiveSolutionInput(null);
  };

  const SolutionsSection = ({
    challengeId,
    solutionsCount,
  }: {
    challengeId: string;
    solutionsCount: number;
  }) => {
    const [solutions, setSolutions] = useState<Solution[]>([
      {
        id: "sol1",
        author: {
          name: "Green Innovators",
          avatar: "/placeholder.svg?height=40&width=40&text=GI",
          verified: true,
        },
        description:
          "We've developed a community engagement program that pairs schools with local parks for tree planting days. Our approach includes educational workshops to maximize impact.",
        likes: 24,
        comments: 5,
        timeAgo: "1 day ago",
        isVerified: true,
      },
      {
        id: "sol2",
        author: {
          name: "Eco Solutions",
          avatar: "/placeholder.svg?height=40&width=40&text=ES",
        },
        description:
          "Mobile app that tracks planted trees and their environmental impact over time, creating gamification elements to encourage participation.",
        likes: 12,
        comments: 3,
        timeAgo: "3 hours ago",
      },
    ]);

    const [likedSolutions, setLikedSolutions] = useState<string[]>([]);

    const handleLikeSolution = (solutionId: string) => {
      setLikedSolutions((prev) =>
        prev.includes(solutionId)
          ? prev.filter((id) => id !== solutionId)
          : [...prev, solutionId]
      );
    };

    return (
      <div className="mt-4 space-y-4">
        {/* Solution Input */}
        <div className="flex items-start gap-3">
          <Avatar className="w-10 h-10 border border-emerald-100">
            <AvatarImage src="/placeholder.svg?height=40&width=40&text=User" />
            <AvatarFallback className="bg-emerald-50 text-emerald-600">
              YO
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              value={newSolutionText}
              onChange={(e) => setNewSolutionText(e.target.value)}
              placeholder="Share your solution..."
              className="min-h-[100px] border-gray-200 focus:border-emerald-300"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setActiveSolutionInput(null)}
                className="border-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleSolutionSubmit(challengeId)}
                disabled={!newSolutionText.trim()}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Post Solution
              </Button>
            </div>
          </div>
        </div>

        {/* Solutions List */}
        <div className="space-y-4">
          {solutions.map((solution) => (
            <Card
              key={solution.id}
              className="border-0 shadow-sm bg-gray-50/50"
            >
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={solution.author.avatar} />
                      <AvatarFallback className="bg-emerald-50 text-emerald-600">
                        {solution.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {solution.author.verified && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                        <CheckCircle className="w-2 h-2 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {solution.author.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {solution.timeAgo}
                        </p>
                      </div>
                      {solution.isVerified && (
                        <Badge
                          variant="secondary"
                          className="bg-emerald-50 text-emerald-600 border-emerald-200"
                        >
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="mt-2 text-gray-700">{solution.description}</p>

                    <div className="flex items-center gap-4 mt-4 pt-2 border-t border-gray-100">
                      <button
                        onClick={() => handleLikeSolution(solution.id)}
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-rose-500"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            likedSolutions.includes(solution.id)
                              ? "fill-rose-500 text-rose-500"
                              : ""
                          }`}
                        />
                        <span>
                          {solution.likes +
                            (likedSolutions.includes(solution.id) ? 1 : 0)}
                        </span>
                      </button>
                      <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-emerald-500">
                        <MessageCircle className="w-4 h-4" />
                        <span>{solution.comments}</span>
                      </button>
                      <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-emerald-500">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      {/* Create Challenge Card */}
      <Card className="border-0 shadow-lg rounded-2xl bg-white/80 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-11 h-11 border-2 border-emerald-100">
              <AvatarImage src="/placeholder.svg?height=40&width=40&text=User" />
              <AvatarFallback className="bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600 font-medium">
                YO
              </AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              className="flex-1 justify-start text-gray-500 hover:text-emerald-600 border-gray-200 rounded-full h-11 px-4 hover:border-emerald-300"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <PlusCircle className="w-5 h-5 mr-2 text-emerald-500" />
              Start a new challenge...
            </Button>
          </div>
          <div className="flex justify-around border-t border-gray-100 pt-3">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-emerald-600 rounded-full px-3"
            >
              <ImageIcon className="w-5 h-5 mr-1.5" />
              Media
            </Button>
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-emerald-600 rounded-full px-3"
            >
              <MapPinIcon className="w-5 h-5 mr-1.5" />
              Location
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Challenges Feed */}
      {challenges.map((challenge) => (
        <Card
          key={challenge.id}
          className="border-0 shadow-lg rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm"
        >
          {/* Header */}
          <CardHeader className="p-4 pb-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-11 h-11 border-2 border-emerald-100">
                    <AvatarImage src={challenge.author.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600 font-medium">
                      {challenge.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {challenge.author.verified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {challenge.author.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    @{challenge.author.username} · {challenge.timeAgo}
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className="border-emerald-200 bg-emerald-50 text-emerald-600"
              >
                {challenge.category}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {challenge.title}
            </h2>
            <p className="text-gray-700 mb-4">{challenge.description}</p>

            {/* Challenge Image */}
            <div className="relative rounded-xl overflow-hidden border border-gray-200 mb-4">
              <Image
                src={challenge.image}
                alt={challenge.title}
                width={800}
                height={450}
                className="w-full h-auto aspect-video object-cover"
              />
              {challenge.video && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    onClick={() =>
                      setPlayingVideo(
                        playingVideo === challenge.id ? null : challenge.id
                      )
                    }
                    className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/60 transition-all"
                  >
                    {playingVideo === challenge.id ? (
                      <Pause className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    )}
                  </Button>
                </div>
              )}
              {/* Stats Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-xs font-medium rounded-full px-3 py-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>{challenge.participants} joined</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-xs font-medium rounded-full px-3 py-1.5">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{challenge.solutions} solutions</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-xs font-medium rounded-full px-3 py-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{challenge.location}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(challenge.id)}
                  className="flex items-center gap-1 group"
                >
                  <div
                    className={`p-2 rounded-full transition-all ${
                      likedChallenges.includes(challenge.id)
                        ? "bg-rose-50 text-rose-500"
                        : "text-gray-500 hover:bg-rose-50 hover:text-rose-500"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        likedChallenges.includes(challenge.id)
                          ? "fill-rose-500"
                          : ""
                      }`}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {challenge.likes +
                      (likedChallenges.includes(challenge.id) ? 1 : 0)}
                  </span>
                </button>

                <button className="flex items-center gap-1 text-gray-500 hover:text-emerald-500">
                  <div className="p-2 rounded-full hover:bg-emerald-50 transition-all">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {challenge.shares}
                  </span>
                </button>
              </div>

              <button
                onClick={() => handleBookmark(challenge.id)}
                className="p-2 rounded-full text-gray-500 hover:bg-emerald-50 hover:text-emerald-500 transition-all"
              >
                <Bookmark
                  className={`w-5 h-5 ${
                    bookmarkedChallenges.includes(challenge.id)
                      ? "fill-emerald-500 text-emerald-500"
                      : ""
                  }`}
                />
              </button>
            </div>
          </CardContent>

          {/* Solutions Section */}
          <CardFooter className="p-4 pt-0 flex-col items-stretch">
            <Button
              onClick={() => {
                toggleSolutions(challenge.id);
                setActiveSolutionInput(challenge.id);
              }}
              variant="outline"
              className="w-full border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl h-11 font-medium transition-all"
            >
              <Lightbulb className="w-5 h-5 mr-2 text-emerald-500" />
              {expandedSolutions === challenge.id
                ? "Hide Solutions"
                : `See ${challenge.solutions} Solutions`}
            </Button>

            {expandedSolutions === challenge.id && (
              <SolutionsSection
                challengeId={challenge.id}
                solutionsCount={challenge.solutions}
              />
            )}
          </CardFooter>
        </Card>
      ))}

      {/* Create Challenge Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white p-6 rounded-2xl border-0 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Create New Challenge
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Inspire others with your environmental initiative
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700"
              >
                Challenge Title
              </label>
              <Input
                id="title"
                value={newChallengeTitle}
                onChange={(e) => setNewChallengeTitle(e.target.value)}
                className="border-gray-300 focus:border-emerald-400 focus:ring-emerald-400 rounded-lg"
                placeholder="e.g., Community Tree Planting Day"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <Textarea
                id="description"
                value={newChallengeDescription}
                onChange={(e) => setNewChallengeDescription(e.target.value)}
                className="border-gray-300 focus:border-emerald-400 focus:ring-emerald-400 rounded-lg min-h-[120px]"
                placeholder="Describe your challenge in detail..."
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="location"
                className="text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <div className="flex gap-2">
                <Input
                  id="location"
                  value={newChallengeLocation}
                  onChange={(e) => setNewChallengeLocation(e.target.value)}
                  className="border-gray-300 focus:border-emerald-400 focus:ring-emerald-400 rounded-lg"
                  placeholder="Where will this take place?"
                />
                <Button
                  variant="outline"
                  onClick={handleUseMyLocation}
                  className="border-gray-300 hover:bg-emerald-50 hover:text-emerald-600"
                >
                  <MapPinIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="image"
                className="text-sm font-medium text-gray-700"
              >
                Cover Image
              </label>
              <div className="flex items-center gap-2">
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 hover:border-emerald-400 rounded-lg p-4 transition-all">
                    <ImageIcon className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {newChallengeImageFile
                        ? newChallengeImageFile.name
                        : "Upload an image"}
                    </span>
                  </div>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleCreateChallengeSubmit}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg h-11 font-semibold shadow-md hover:shadow-lg transition-all w-full"
            >
              <Leaf className="w-4 h-4 mr-2" />
              Post Challenge
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
