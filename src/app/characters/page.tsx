"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CharacterCard } from "@/components/character-card";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

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
  {
    id: "4",
    name: "Ironbeard",
    realm: "Mal'Ganis",
    class: "Warrior",
    race: "Dwarf",
    level: 75,
    itemLevel: 520,
    faction: "Alliance" as const,
  },
  {
    id: "5",
    name: "Natureheart",
    realm: "Emerald Dream",
    class: "Druid",
    race: "Tauren",
    level: 80,
    itemLevel: 572,
    faction: "Horde" as const,
  },
];

export default function CharactersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFaction, setSelectedFaction] = useState<"All" | "Alliance" | "Horde">("All");

  const filteredCharacters = mockCharacters.filter(character => {
    const matchesSearch = character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         character.realm.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         character.class.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFaction = selectedFaction === "All" || character.faction === selectedFaction;
    return matchesSearch && matchesFaction;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Characters</h1>
          <p className="text-muted-foreground">
            Manage and view all your World of Warcraft characters
          </p>
        </div>
        <button className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-accent transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Character</span>
        </button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name, realm, or class..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Faction</label>
              <select
                value={selectedFaction}
                onChange={(e) => setSelectedFaction(e.target.value as "All" | "Alliance" | "Horde")}
                className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="All">All Factions</option>
                <option value="Alliance">Alliance</option>
                <option value="Horde">Horde</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Characters Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-primary">
            {filteredCharacters.length} Character{filteredCharacters.length !== 1 ? 's' : ''}
          </h2>
          <div className="text-sm text-muted-foreground">
            Avg iLvl: {Math.round(filteredCharacters.reduce((sum, c) => sum + c.itemLevel, 0) / filteredCharacters.length || 0)}
          </div>
        </div>
        
        {filteredCharacters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCharacters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onSelect={(char) => console.log("Selected character:", char.name)}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  No characters found
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Try adjusting your search or filters
                </p>
                <button className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-accent transition-colors">
                  <Plus className="h-4 w-4" />
                  <span>Add Your First Character</span>
                </button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}