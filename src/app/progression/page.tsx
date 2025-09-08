"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Zap, Users, Star } from "lucide-react";
import { useState } from "react";

// Mock data for demonstration
const mockRaidProgress = [
  {
    name: "Nerub-ar Palace",
    difficulty: "Mythic",
    progress: 6,
    total: 8,
    bosses: [
      { name: "Ulgrax the Devourer", killed: true, difficulty: "Mythic" },
      { name: "The Bloodbound Horror", killed: true, difficulty: "Mythic" },
      { name: "Sikran", killed: true, difficulty: "Mythic" },
      { name: "Rasha'nan", killed: true, difficulty: "Mythic" },
      { name: "Broodtwister Ovi'nax", killed: true, difficulty: "Mythic" },
      { name: "Nexus-Princess Ky'veza", killed: true, difficulty: "Mythic" },
      { name: "The Silken Court", killed: false, difficulty: "Mythic" },
      { name: "Queen Ansurek", killed: false, difficulty: "Mythic" },
    ]
  },
  {
    name: "Nerub-ar Palace",
    difficulty: "Heroic",
    progress: 8,
    total: 8,
    bosses: [
      { name: "Ulgrax the Devourer", killed: true, difficulty: "Heroic" },
      { name: "The Bloodbound Horror", killed: true, difficulty: "Heroic" },
      { name: "Sikran", killed: true, difficulty: "Heroic" },
      { name: "Rasha'nan", killed: true, difficulty: "Heroic" },
      { name: "Broodtwister Ovi'nax", killed: true, difficulty: "Heroic" },
      { name: "Nexus-Princess Ky'veza", killed: true, difficulty: "Heroic" },
      { name: "The Silken Court", killed: true, difficulty: "Heroic" },
      { name: "Queen Ansurek", killed: true, difficulty: "Heroic" },
    ]
  }
];

const mockMythicPlusData = {
  currentSeasonBest: 15,
  weeklyBest: 12,
  totalRuns: 47,
  dungeons: [
    { name: "The Stonevault", level: 15, completed: true, inTime: true },
    { name: "Ara-Kara, City of Echoes", level: 14, completed: true, inTime: true },
    { name: "City of Threads", level: 13, completed: true, inTime: false },
    { name: "The Dawnbreaker", level: 12, completed: true, inTime: true },
    { name: "Mists of Tirna Scithe", level: 16, completed: false, inTime: false },
    { name: "The Necrotic Wake", level: 11, completed: true, inTime: true },
    { name: "Siege of Boralus", level: 14, completed: true, inTime: true },
    { name: "Grim Batol", level: 13, completed: true, inTime: true },
  ]
};

const difficultyColors = {
  "Normal": "#1D4ED8",
  "Heroic": "#7C3AED", 
  "Mythic": "#DC2626"
};

export default function ProgressionPage() {
  const [selectedCharacter, setSelectedCharacter] = useState("Thalarion");
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">PvE Progression</h1>
          <p className="text-muted-foreground">
            Track your raid clears and Mythic+ progression
          </p>
        </div>
        <select
          value={selectedCharacter}
          onChange={(e) => setSelectedCharacter(e.target.value)}
          className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="Thalarion">Thalarion</option>
          <option value="Shadowmoon">Shadowmoon</option>
          <option value="Flamestrike">Flamestrike</option>
        </select>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest M+ Key</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockMythicPlusData.currentSeasonBest}</div>
            <p className="text-xs text-muted-foreground">
              This season
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">M+ Runs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockMythicPlusData.totalRuns}</div>
            <p className="text-xs text-muted-foreground">
              Total completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mythic Bosses</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {mockRaidProgress.find(r => r.difficulty === "Mythic")?.progress || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              This tier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievement Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">14,250</div>
            <p className="text-xs text-muted-foreground">
              Total points
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Raid Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Raid Progress</CardTitle>
          <CardDescription>Current tier raid completion status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {mockRaidProgress.map((raid, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{raid.name}</h3>
                  <p 
                    className="text-sm font-medium"
                    style={{ color: difficultyColors[raid.difficulty as keyof typeof difficultyColors] }}
                  >
                    {raid.difficulty} Difficulty
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {raid.progress}/{raid.total}
                  </div>
                  <p className="text-xs text-muted-foreground">Bosses cleared</p>
                </div>
              </div>
              
              <Progress 
                value={raid.progress} 
                max={raid.total} 
                variant="primary"
                showPercentage={true}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                {raid.bosses.map((boss, bossIndex) => (
                  <div 
                    key={bossIndex}
                    className={`p-2 rounded text-sm ${
                      boss.killed 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-secondary text-muted-foreground border border-border'
                    }`}
                  >
                    <div className="font-medium">{boss.name}</div>
                    <div className="text-xs">
                      {boss.killed ? 'Defeated' : 'Not defeated'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Mythic+ Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Mythic+ Dungeons</CardTitle>
          <CardDescription>Current season keystone progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockMythicPlusData.dungeons.map((dungeon, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border ${
                    dungeon.completed && dungeon.inTime
                      ? 'bg-green-500/10 border-green-500/30'
                      : dungeon.completed
                      ? 'bg-yellow-500/10 border-yellow-500/30'
                      : 'bg-red-500/10 border-red-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{dungeon.name}</h4>
                    <span className="text-lg font-bold text-primary">+{dungeon.level}</span>
                  </div>
                  <div className="text-xs">
                    {dungeon.completed 
                      ? (dungeon.inTime ? 'Completed in time' : 'Completed (overtime)')
                      : 'Not completed'
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}