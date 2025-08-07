"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { FaTrophy } from 'react-icons/fa';
import { IoPersonCircle } from 'react-icons/io5';

const mockLeaderboardData = [
  { id: 1, name: "John Doe", score: 1200, rank: 1 },
  { id: 2, name: "Jane Smith", score: 1100, rank: 2 },
  { id: 3, name: "Alex Johnson", score: 1000, rank: 3 },
  { id: 4, name: "Emily Davis", score: 900, rank: 4 },
  { id: 5, name: "Michael Brown", score: 800, rank: 5 },
];

interface LeaderboardEntry {
  id: number;
  name: string;
  score: number;
  rank: number;
}

export default function Leaderboard() {
  const [leaderboardData] = useState<LeaderboardEntry[]>(mockLeaderboardData);

  return (
    <section className=" bg-white px-8 lg:px-16 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-extrabold text-primary mb-10 text-center flex items-center justify-center space-x-2 dark:text-black">
          <FaTrophy className="w-8 h-8 text-primary dark:text-yellow-400" />
          <span>Leaderboard</span>
        </h2>
        <div className="bg-tertiary rounded-2xl shadow-sm overflow-hidden dark:bg-gray-800">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-primary text-white dark:bg-green-400 dark:text-gray-900">
                <th className="py-4 px-6 font-bold text-lg">Rank</th>
                <th className="py-4 px-6 font-bold text-lg">Name</th>
                <th className="py-4 px-6 font-bold text-lg">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry) => (
                <tr key={entry.id} className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
                  <td className="py-4 px-6 text-primary font-bold dark:text-green-400">{entry.rank}</td>
                  <td className="py-4 px-6 text-gray-700 flex items-center space-x-2 dark:text-gray-300">
                    <IoPersonCircle className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                    <span>{entry.name}</span>
                  </td>
                  <td className="py-4 px-6 text-gray-700 dark:text-gray-300">{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 text-center">
          <Button className="bg-leafy-button-green hover:bg-primary text-white dark:bg-green-400 dark:text-gray-900 dark:hover:bg-green-500 rounded-lg px-8 py-3 text-lg font-medium shadow-md transition-colors">
            View More
          </Button>
        </div>
      </div>
    </section>
  );
}