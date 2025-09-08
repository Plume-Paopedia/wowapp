"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CharacterCard } from "@/components/character-card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Users, Target, TrendingUp } from "lucide-react";

// Mock data for demonstration
const mockCharacters = [
  {
    id: "1",
    name: "Thalarion",
    realm: "Stormrage",
    class: "Paladin",
    race: "Human",
    level: 80,
    itemLevel: 580,
    faction: "Alliance" as const,
  },
  {
    id: "2", 
    name: "Shadowmoon",
    realm: "Tichondrius",
    class: "Rogue",
    race: "Night Elf",
    level: 78,
    itemLevel: 545,
    faction: "Alliance" as const,
  },
  {
    id: "3",
    name: "Flamestrike",
    realm: "Area-52",
    class: "Mage",
    race: "Blood Elf",
    level: 80,
    itemLevel: 595,
    faction: "Horde" as const,
  },
];

const mockObjectives = [
  { name: "Reach 600 iLvl", progress: 85, total: 100 },
  { name: "Complete Mythic+ 15", progress: 12, total: 15 },
  { name: "Exalted with Dream Wardens", progress: 18500, total: 21000 },
];

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your World of Warcraft progression across all characters
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Characters</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockCharacters.length}</div>
            <p className="text-xs text-muted-foreground">
              Across multiple realms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest iLvl</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {Math.max(...mockCharacters.map(c => c.itemLevel))}
            </div>
            <p className="text-xs text-muted-foreground">
              {mockCharacters.find(c => c.itemLevel === Math.max(...mockCharacters.map(c => c.itemLevel)))?.name}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Objectives</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockObjectives.length}</div>
            <p className="text-xs text-muted-foreground">
              In progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg iLvl</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {Math.round(mockCharacters.reduce((sum, c) => sum + c.itemLevel, 0) / mockCharacters.length)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all characters
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Characters Grid */}
      <div>
        <h2 className="text-xl font-semibold text-primary mb-4">Your Characters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onSelect={(char) => console.log("Selected character:", char.name)}
            />
          ))}
        </div>
      </div>

      {/* Current Objectives */}
      <Card>
        <CardHeader>
          <CardTitle>Current Objectives</CardTitle>
          <CardDescription>
            Track your progress towards your goals
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockObjectives.map((objective, index) => (
            <div key={index}>
              <Progress
                value={objective.progress}
                max={objective.total}
                label={objective.name}
                variant="primary"
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
