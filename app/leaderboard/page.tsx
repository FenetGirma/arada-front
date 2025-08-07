import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Crown, Medal, Star } from "lucide-react";
import { CrownIcon } from "lucide-react";
import { IoMedalOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Mock data for the leaderboard
const mockUsers = [
  {
    id: 1,
    username: "Mako_01",
    points: 5000,
    avatar: "/images/image.png",
    rank: 1,
  },
  {
    id: 2,
    username: "Mm.01",
    points: 3000,
    avatar: "/images/image.png",
    rank: 2,
  },
  {
    id: 3,
    username: "Me.Ti",
    points: 1000,
    avatar: "/images/image.png",
    rank: 3,
  },
  {
    id: 4,
    username: "Player4",
    points: 950,
    avatar: "/gaming-avatar-four.png",
    rank: 4,
  },
  {
    id: 5,
    username: "Gamer5",
    points: 890,
    avatar: "/gaming-avatar-five.png",
    rank: 5,
  },
  {
    id: 6,
    username: "Pro6",
    points: 820,
    avatar: "/gaming-avatar-6.png",
    rank: 6,
  },
  {
    id: 7,
    username: "Elite7",
    points: 780,
    avatar: "/gaming-avatar-7.png",
    rank: 7,
  },
  {
    id: 8,
    username: "Master8",
    points: 720,
    avatar: "/gaming-avatar-8.png",
    rank: 8,
  },
  {
    id: 9,
    username: "Champion9",
    points: 680,
    avatar: "/gaming-avatar-9.png",
    rank: 9,
  },
  {
    id: 10,
    username: "Legend10",
    points: 650,
    avatar: "/gaming-avatar-10.png",
    rank: 10,
  },
];

const TopThreeCard = ({
  user,
  position,
}: {
  user: (typeof mockUsers)[0];
  position: 1 | 2 | 3;
}) => {
  const isWinner = position === 1;
  const positionConfig = {
    1: {
      icon: (
        <CrownIcon className="w-8 md:w-10 mb-4 h-8 md:h-10 text-yellow-500" />
      ),
      bgGradient: "from-yellow-100 to-green-50",
      borderColor: "border-yellow-400",
      scale: "scale-110",
      avatarSize: "w-24 h-24 md:w-32 md:h-32",
      imageSize: { width: 96, height: 96, mdWidth: 128, mdHeight: 128 },
      marginTop: "mt-0",
    },
    2: {
      icon: <IoMedalOutline className="w-6 md:w-8 h-6 md:h-8 text-gray-400" />,
      bgGradient: "from-gray-100 to-green-50",
      borderColor: "border-gray-400",
      scale: "scale-100",
      avatarSize: "w-16 h-16 md:w-20 md:h-20",
      imageSize: { width: 64, height: 64, mdWidth: 80, mdHeight: 80 },
      marginTop: "mt-8 md:mt-12",
    },
    3: {
      icon: <IoMedalOutline className="w-6 md:w-8 h-6 md:h-8 text-amber-600" />,
      bgGradient: "from-amber-100 to-green-50",
      borderColor: "border-amber-500",
      scale: "scale-100",
      avatarSize: "w-16 h-16 md:w-20 md:h-20",
      imageSize: { width: 64, height: 64, mdWidth: 80, mdHeight: 80 },
      marginTop: "mt-8 md:mt-12",
    },
  };

  const config = positionConfig[position];

  return (
    <div className="flex p-4 md:p-10 items-center justify-center relative">
      <div className={cn("absolute", isWinner ? "top-0" : "top-10")}>
        <div
          className={cn(
            `flex relative flex-col items-center ${config.scale} ${config.marginTop} transition-transform duration-300`
          )}
        >
          <div>
            <div className="absolute -top-6 md:-top-10 left-1/2 transform -translate-x-1/2 z-10">
              {config.icon}
            </div>
            <Avatar
              className={`${config.avatarSize} mx-auto border-2 md:border-4 ${
                config.borderColor
              } ${!isWinner ? "rounded-full" : ""}`}
            >
              <Image
                width={config.imageSize.width}
                height={config.imageSize.height}
                src={user.avatar || "/gaming-avatar-7.png"}
                alt={user.username}
                className={`${config.avatarSize} ${
                  !isWinner ? "rounded-full" : ""
                } object-cover`}
              />
              <AvatarFallback className="text-sm md:text-lg font-bold">
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="text-center mt-2 md:mt-4">
            <p className="font-bold text-sm md:text-lg text-gray-800">
              @{user.username}
            </p>
            <div className="mt-2 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-lg">
              <span className="text-xs md:text-sm font-bold">
                {user.points.toLocaleString()}
              </span>
              <span className="text-xs md:text-sm ml-1 opacity-90">pts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LeaderboardRow = ({
  user,
  index,
}: {
  user: (typeof mockUsers)[0];
  index: number;
}) => {
  const isTopThree = index < 3;
  const rankColor = isTopThree ? "text-green-600" : "text-gray-600";
  const bgColor = isTopThree ? "bg-white" : "bg-white";

  return (
    <Card
      className={`${bgColor} border-l-4 ${
        isTopThree ? "border-l-green-400" : "border-l-gray-200"
      } hover:shadow-md transition-shadow duration-200`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className={cn(
                `flex items-center justify-center rounded-full ${
                  isTopThree ? "bg-green-100" : "bg-gray-100"
                }`,
                user.rank > 9 ? "w-12 h-12" : "w-10 h-10"
              )}
            >
              <span
                className={`font-bold items-center flex text-lg ${rankColor}`}
              >
                {user.rank}
              </span>
            </div>
            <Avatar className="w-12 h-12 border-2 border-green-200">
              <AvatarImage
                src={user.avatar || "/placeholder.svg"}
                alt={user.username}
              />
              <AvatarFallback className="font-semibold">
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">
                {user.username}
              </span>
              <span className="text-sm text-gray-500">
                @{user.username.toLowerCase()}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-green-500" />
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-300 font-bold"
            >
              {user.points.toLocaleString()} pts
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function LeaderboardPage() {
  const topThree = mockUsers.slice(0, 3);
  const remainingUsers = mockUsers.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-8 h-8 text-green-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Leaderboard
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Compete with the best and climb your way to the top! Track your
            progress and see how you rank against other players.
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-16 pb-16 md:pb-20">
          <div className="grid mb-10 grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-end justify-center max-w-4xl mx-auto">
            {/* 2nd Place */}
            <div className="order-1 md:order-1 flex justify-center">
              <TopThreeCard user={topThree[1]} position={2} />
            </div>
            {/* 1st Place */}
            <div className="order-2 md:order-2 flex justify-center">
              <TopThreeCard user={topThree[0]} position={1} />
            </div>
            {/* 3rd Place */}
            <div className="order-3 md:order-3 flex justify-center">
              <TopThreeCard user={topThree[2]} position={3} />
            </div>
          </div>
        </div>

        {/* Full Rankings */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Medal className="w-6 h-6 text-green-600 mr-2" />
            Full Rankings
          </h2>
          <div className="space-y-3">
            {mockUsers.map((user, index) => (
              <LeaderboardRow key={user.id} user={user} index={index} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>Rankings updated in real-time • Keep playing to climb higher!</p>
        </div>
      </div>
    </div>
  );
}
