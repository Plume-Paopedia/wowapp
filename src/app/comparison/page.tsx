"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CharacterComparison } from "@/components/character-comparison";
import { Character } from "@/types";
import { cn, getClassColor } from "@/lib/utils";

// Mock data - same as other pages
const mockCharacters: Character[] = [
  {
    id: "1",
    name: "Thalarion",
    realm: "Stormrage",
    class: "Paladin",
    race: "Human",
    level: 80,
    itemLevel: 580,
    faction: "Alliance",
    lastUpdated: new Date(),
    guild: "Azeroth Champions",
    spec: "Protection"
  },
  {
    id: "2", 
    name: "Shadowmoon",
    realm: "Tichondrius",
    class: "Rogue",
    race: "Night Elf",
    level: 78,
    itemLevel: 545,
    faction: "Alliance",
    lastUpdated: new Date(),
    spec: "Subtlety"
  },
  {
    id: "3",
    name: "Flamestrike",
    realm: "Area-52",
    class: "Mage",
    race: "Blood Elf",
    level: 80,
    itemLevel: 595,
    faction: "Horde",
    lastUpdated: new Date(),
    guild: "Crimson Covenant",
    spec: "Fire"
  },
  {
    id: "4",
    name: "Ironbeard",
    realm: "Mal'Ganis",
    class: "Warrior",
    race: "Dwarf",
    level: 75,
    itemLevel: 520,
    faction: "Alliance",
    lastUpdated: new Date(),
    spec: "Fury"
  },
  {
    id: "5",
    name: "Natureheart",
    realm: "Emerald Dream",
    class: "Druid",
    race: "Tauren",
    level: 80,
    itemLevel: 572,
    faction: "Horde",
    lastUpdated: new Date(),
    spec: "Balance"
  },
];

export default function ComparisonPage() {
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);

  const toggleCharacter = (character: Character) => {
    setSelectedCharacters(prev => {
      const isSelected = prev.some(c => c.id === character.id);
      if (isSelected) {
        return prev.filter(c => c.id !== character.id);
      } else {
        return [...prev, character];
      }
    });
  };

  const clearSelection = () => {
    setSelectedCharacters([]);
  };

  const selectAll = () => {
    setSelectedCharacters(mockCharacters);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Character Comparison</h1>
          <p className="text-muted-foreground">
            Compare progression across multiple characters
          </p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={clearSelection}
            className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          >
            Clear All
          </button>
          <button 
            onClick={selectAll}
            className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-colors"
          >
            Select All
          </button>
        </div>
      </div>

      {/* Character Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Characters to Compare</CardTitle>
          <CardDescription>
            Choose the characters you want to include in the comparison
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockCharacters.map((character) => {
              const isSelected = selectedCharacters.some(c => c.id === character.id);
              return (
                <div
                  key={character.id}
                  onClick={() => toggleCharacter(character)}
                  className={cn(
                    "p-4 rounded-lg border cursor-pointer transition-all duration-200",
                    isSelected 
                      ? "border-primary bg-primary/10" 
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ 
                        backgroundColor: getClassColor(character.class) + "20",
                        color: getClassColor(character.class)
                      }}
                    >
                      {character.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h3 
                        className="font-semibold"
                        style={{ color: getClassColor(character.class) }}
                      >
                        {character.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Level {character.level} {character.race} {character.class}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {character.realm} - {character.itemLevel} ilvl
                      </p>
                    </div>
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 transition-colors",
                      isSelected 
                        ? "bg-primary border-primary" 
                        : "border-border"
                    )}>
                      {isSelected && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {selectedCharacters.length > 0 && (
            <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Selected {selectedCharacters.length} character{selectedCharacters.length !== 1 ? 's' : ''}: {' '}
                <span className="font-medium">
                  {selectedCharacters.map(c => c.name).join(', ')}
                </span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comparison Results */}
      <CharacterComparison characters={selectedCharacters} />
    </div>
  );
}