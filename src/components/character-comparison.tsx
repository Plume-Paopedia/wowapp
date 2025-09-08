"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProgressChart } from "@/components/ui/chart";
import { cn, getClassColor, formatItemLevel } from "@/lib/utils";
import { Character } from "@/types";

interface CharacterComparisonProps {
  characters: Character[];
  className?: string;
}

export function CharacterComparison({ characters, className }: CharacterComparisonProps) {
  if (characters.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              No characters selected
            </h3>
            <p className="text-sm text-muted-foreground">
              Select characters to compare their progression
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Prepare data for charts
  const ilvlData = characters.map(char => ({
    name: char.name,
    value: char.itemLevel,
    class: char.class
  }));

  const levelData = characters.map(char => ({
    name: char.name,
    value: char.level,
    class: char.class
  }));

  return (
    <div className={cn("space-y-6", className)}>
      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Character Comparison</CardTitle>
          <CardDescription>
            Side-by-side comparison of selected characters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">Character</th>
                  <th className="text-left py-3 px-4 font-medium">Level</th>
                  <th className="text-left py-3 px-4 font-medium">Item Level</th>
                  <th className="text-left py-3 px-4 font-medium">Class</th>
                  <th className="text-left py-3 px-4 font-medium">Realm</th>
                  <th className="text-left py-3 px-4 font-medium">Faction</th>
                </tr>
              </thead>
              <tbody>
                {characters.map((character, index) => (
                  <tr key={character.id} className="border-b border-border/50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                          style={{ 
                            backgroundColor: getClassColor(character.class) + "20",
                            color: getClassColor(character.class)
                          }}
                        >
                          {character.name.charAt(0).toUpperCase()}
                        </div>
                        <span 
                          className="font-medium"
                          style={{ color: getClassColor(character.class) }}
                        >
                          {character.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{character.level}</span>
                        <Progress 
                          value={character.level} 
                          max={80} 
                          className="w-16 h-2"
                          variant="primary"
                          showPercentage={false}
                        />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-primary">
                        {formatItemLevel(character.itemLevel)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span style={{ color: getClassColor(character.class) }}>
                        {character.class}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      {character.realm}
                    </td>
                    <td className="py-4 px-4">
                      <span 
                        className="px-2 py-1 text-xs rounded-full"
                        style={{
                          backgroundColor: character.faction === "Alliance" ? "var(--blue-alliance)" + "20" : "var(--red-horde)" + "20",
                          color: character.faction === "Alliance" ? "var(--blue-alliance)" : "var(--red-horde)"
                        }}
                      >
                        {character.faction}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Item Level Comparison</CardTitle>
            <CardDescription>
              Compare item levels across characters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProgressChart data={ilvlData} type="bar" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Level Distribution</CardTitle>
            <CardDescription>
              Character level breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProgressChart data={levelData} type="bar" />
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Highest Item Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {Math.max(...characters.map(c => c.itemLevel))}
            </div>
            <p className="text-xs text-muted-foreground">
              {characters.find(c => c.itemLevel === Math.max(...characters.map(c => c.itemLevel)))?.name}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Average Item Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {Math.round(characters.reduce((sum, c) => sum + c.itemLevel, 0) / characters.length)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across {characters.length} character{characters.length !== 1 ? 's' : ''}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Max Level Characters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {characters.filter(c => c.level === 80).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Out of {characters.length} total
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}