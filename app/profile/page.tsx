"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Edit,
  Phone,
  Mail,
  User,
  AtSign,
  Grid3X3,
  Trophy,
  Target,
  Calendar,
  Clock,
  Award,
  X,
} from "lucide-react";
import Image from "next/image";
import { Map } from "lucide-react";
import { MapContainer } from "react-leaflet";

import dynamic from "next/dynamic";
import { jwtDecode } from "jwt-decode";
const ImpactMap = dynamic(() => import("@/components/map"), {
  ssr: false,
});

interface Challenge {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  imageUrl?: string;
  createdBy?: {
    id: string;
    name?: string;
  };
  location?:
    | string
    | {
        latitude: number;
        longitude: number;
      };
  upvotes?: number;
  points?: number;
  solutions?: any[]; // replace with actual Solution interface if needed
  status?: string; // optional frontend field for display (e.g., "completed")
  date?: string; // optional frontend field for display
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  stats: {
    challenges: number;
    solutions: number;
    points: number;
  };
}

interface TokenPayload {
  sub: string; // or 'id', depending on how your backend structures JWTs
}

const parseLocation = (locationString: string) => {
  const match = locationString.match(/Lat:\s*([-\d.]+),\s*Lon:\s*([-\d.]+)/i);
  if (!match) return null;

  const latitude = parseFloat(match[1]);
  const longitude = parseFloat(match[2]);

  return { latitude, longitude };
};

const fetchUserChallenges = async (): Promise<Challenge[]> => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found in localStorage");
    return [];
  }

  try {
    const decoded: TokenPayload = jwtDecode(token);
    const userId = decoded.sub;
    console.log("user id", userId);

    const response = await fetch(`http://localhost:3001/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const userData = await response.json();

    const parsedChallenges = (userData.challenges || []).map(
      (challenge: any) => {
        if (typeof challenge.location === "string") {
          const parsedLocation = parseLocation(challenge.location);
          return { ...challenge, location: parsedLocation };
        }
        return challenge;
      }
    );
    console.log(parsedChallenges);
    return parsedChallenges;
  } catch (error) {
    console.error("Error fetching user or challenges:", error);
    return [];
  }
};

const fetchUser = async (): Promise<User> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found in localStorage");
  }

  try {
    const decoded: TokenPayload = jwtDecode(token);
    const userId = decoded.sub;
    console.log("user id", userId);

    const response = await fetch(`http://localhost:3001/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const userData = await response.json();

    // Map API response to User interface
    return {
      id: Number(userData.id) || 0,
      name: userData.name || "Unknown User",
      username: userData.username || `user_${userId}`,
      email: userData.email || "no-email@example.com",
      phone: userData.phone || "N/A",
      avatar: userData.avatar || "/placeholder.svg",
      bio: userData.bio || "No bio provided",
      stats: {
        challenges: userData.challenges.length || 0,
        solutions: userData.solutions.length || 0,
        points: userData.points || 0,
      },
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// Mock user data
const mockUser = {
  id: 1,
  name: "Sameer Acharya",
  username: "sawmeer_acharya",
  email: "sameer@example.com",
  phone: "+1 (555) 123-4567",
  avatar: "/gaming-avatar-1.png",
  bio: "I'm committed to a 30-day design challenge. Today is day 6.",
  stats: {
    challenges: 12,
    solutions: 8,
    points: 2450,
  },
};


const mockSolutions = [
  {
    id: 1,
    title: "E-commerce Dashboard",
    image: "/modern-data-dashboard.png",
    date: "2024-01-12",
    challengeId: 1,
    points: 180,
  }, 
  {
    id: 2,
    title: "Banking App UI",
    image: "/banking-app-design.png",
    date: "2024-01-08",
    challengeId: 2,
    points: 220,
  },
];

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(mockUser);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [userChallenges, setUserChallenges] = useState<any>([]);

  useEffect(() => {
    const getUserAndChallenges = async () => {
      try {
        const [fetchedUser, myChallenges] = await Promise.all([
          fetchUser(),
          fetchUserChallenges(),
        ]);
        setUser(fetchedUser);
        setEditForm(fetchedUser);
        setUserChallenges(myChallenges);
      } catch (err) {
        console.error(err);
      }
    };

    getUserAndChallenges();
  }, []);

  const handleSave = () => {
    setUser(editForm);
    setIsEditing(false);
  };

  const PostCard = ({
    post,
    type,
  }: {
    post: any;
    type: "challenge" | "solution";
  }) => (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg">
          <Image
            src={`http://localhost:3001${post.imageUrl}` || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
              <Trophy className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm font-semibold">{post.points} pts</p>
            </div>
          </div>
          {type === "challenge" && (
            <Badge
              className={`absolute top-2 right-2 text-xs ${
                post.status === "completed" ? "bg-green-500" : "bg-orange-500"
              }`}
            >
              {post.status}
            </Badge>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === "challenge" ? (
              <Target className="w-5 h-5" />
            ) : (
              <Award className="w-5 h-5" />
            )}
            {post.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={
                `http://localhost:3001${post.imageUrl}` || "/placeholder.svg"
              }
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <p>{post.description}</p>
            </div>
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              {post.points} points
            </div>
          </div>
          {type === "challenge" && (
            <Badge
              className={`w-fit ${
                post.status === "completed"
                  ? "bg-green-100 text-green-800"
                  : "bg-orange-100 text-orange-800"
              }`}
            >
              {post.status === "completed" ? "Completed" : "In Progress"}
            </Badge>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );

  const EmptyState = ({ type }: { type: "challenges" | "solutions" }) => (
    <div className="col-span-3 flex flex-col items-center justify-center py-16 text-gray-500">
      {type === "challenges" ? (
        <Target className="w-16 h-16 mb-4 text-gray-300" />
      ) : (
        <Award className="w-16 h-16 mb-4 text-gray-300" />
      )}
      <p className="text-lg font-medium mb-2">You have no {type} yet</p>
      <p className="text-sm text-center max-w-xs">
        {type === "challenges"
          ? "Start participating in challenges to see them here"
          : "Submit solutions to challenges to see them here"}
      </p>
    </div>
  );

  return (
    <div className=" bg-gray-50">
      <div className="pl-20 max-w-full mx-auto bg-white min-h-screen">
        {/* Profile Section */}
        <div className="p-6">
          <div className="flex justify-between">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-20 h-20 border-4 border-green-400">
                <AvatarImage
                  src={user?.avatar || "/placeholder.svg"}
                  alt={user?.name}
                />
                <AvatarFallback className="text-lg font-bold">
                  {user?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">
                  {user?.name}
                </h2>
                <p className="text-gray-600">@{user?.username}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>

          {/* Stats */}
          <div className="flex justify-around py-4 border-y border-gray-100">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">
                {user?.stats.challenges}
              </div>
              <div className="text-sm text-gray-600">Challenges</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">
                {user?.stats.solutions}
              </div>
              <div className="text-sm text-gray-600">Solutions</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">
                {user?.stats.points}
              </div>
              <div className="text-sm text-gray-600">Points</div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4" />
              {user?.email}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4" />
              {user?.phone}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="challenges" className="px-6">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="challenges" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              My Challenges
            </TabsTrigger>
            <TabsTrigger value="solutions" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              My Solutions
            </TabsTrigger>
            <TabsTrigger value="impact-map" className="flex items-center gap-2">
              <Map className="w-4 h-4" />
              Impact Map
            </TabsTrigger>
          </TabsList>

          <TabsContent value="challenges">
            <div className="grid grid-cols-3 gap-2 pb-6">
              {userChallenges.length > 0 ? (
                userChallenges.map((challenge: Challenge) => (
                  <PostCard
                    key={challenge.id}
                    post={challenge}
                    type="challenge"
                  />
                ))
              ) : (
                <EmptyState type="challenges" />
              )}
            </div>
          </TabsContent>

          <TabsContent value="solutions">
            <div className="grid grid-cols-3 gap-2 pb-6">
              {mockSolutions.length > 0 ? (
                mockSolutions.map((solution) => (
                  <PostCard key={solution.id} post={solution} type="solution" />
                ))
              ) : (
                <EmptyState type="solutions" />
              )}
            </div>
          </TabsContent>
          <TabsContent value="impact-map">
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              <ImpactMap challenges={userChallenges} />
            </div>
          </TabsContent>
        </Tabs>

        {/* Edit Profile Dialog */}
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={editForm.username}
                  onChange={(e) =>
                    setEditForm({ ...editForm, username: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSave} className="flex-1">
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (user) setEditForm(user);
                    setIsEditing(false);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProfilePage;
