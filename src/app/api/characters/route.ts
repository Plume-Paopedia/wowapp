import { NextRequest, NextResponse } from "next/server";
import { Character, ApiResponse } from "@/types";

// Mock data - in a real app, this would come from a database
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
];

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<Character[]>>> {
  try {
    const { searchParams } = new URL(request.url);
    const faction = searchParams.get("faction");
    const search = searchParams.get("search");

    let filteredCharacters = mockCharacters;

    // Filter by faction
    if (faction && faction !== "All") {
      filteredCharacters = filteredCharacters.filter(char => char.faction === faction);
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      filteredCharacters = filteredCharacters.filter(char => 
        char.name.toLowerCase().includes(searchLower) ||
        char.realm.toLowerCase().includes(searchLower) ||
        char.class.toLowerCase().includes(searchLower) ||
        char.race.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredCharacters,
      message: `Found ${filteredCharacters.length} characters`
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to fetch characters",
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<Character>>> {
  try {
    const body = await request.json();
    const { name, realm, characterClass, race, faction } = body;

    // Validate required fields
    if (!name || !realm || !characterClass || !race || !faction) {
      return NextResponse.json({
        success: false,
        error: "Missing required fields",
        message: "Name, realm, class, race, and faction are required"
      }, { status: 400 });
    }

    // In a real app, this would:
    // 1. Validate the character exists on Battle.net
    // 2. Fetch character data from Battle.net API
    // 3. Save to database
    // 4. Return the saved character

    const newCharacter: Character = {
      id: (mockCharacters.length + 1).toString(),
      name,
      realm,
      class: characterClass,
      race,
      level: 1, // Would be fetched from Battle.net
      itemLevel: 0, // Would be fetched from Battle.net
      faction: faction as "Alliance" | "Horde",
      lastUpdated: new Date()
    };

    return NextResponse.json({
      success: true,
      data: newCharacter,
      message: "Character added successfully"
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to add character",
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}