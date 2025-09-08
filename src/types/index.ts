// Character related types
export interface Character {
  id: string;
  name: string;
  realm: string;
  class: string;
  race: string;
  level: number;
  itemLevel: number;
  faction: "Alliance" | "Horde";
  avatar?: string;
  lastUpdated?: Date;
  guild?: string;
  spec?: string;
}

// Progression related types
export interface RaidBoss {
  name: string;
  killed: boolean;
  difficulty: "Normal" | "Heroic" | "Mythic";
  firstKillDate?: Date;
}

export interface RaidProgress {
  name: string;
  difficulty: "Normal" | "Heroic" | "Mythic";
  progress: number;
  total: number;
  bosses: RaidBoss[];
  tier: string;
}

export interface MythicPlusDungeon {
  name: string;
  level: number;
  completed: boolean;
  inTime: boolean;
  completedAt?: Date;
  affixes?: string[];
}

export interface MythicPlusData {
  currentSeasonBest: number;
  weeklyBest: number;
  totalRuns: number;
  dungeons: MythicPlusDungeon[];
  rating?: number;
}

// Objectives related types
export interface Objective {
  id: string;
  title: string;
  description: string;
  category: "Item Level" | "Raids" | "Mythic+" | "Reputation" | "Achievements" | "Custom";
  progress: number;
  target: number;
  unit: string;
  priority: "Low" | "Medium" | "High";
  deadline?: string;
  completed: boolean;
  character?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Reputation related types
export interface Reputation {
  id: string;
  name: string;
  standing: "Hated" | "Hostile" | "Unfriendly" | "Neutral" | "Friendly" | "Honored" | "Revered" | "Exalted";
  value: number;
  max: number;
  expansion: string;
}

// Achievement related types
export interface Achievement {
  id: number;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  completedTimestamp?: number;
  category: string;
  icon: string;
}

// User related types
export interface User {
  id: string;
  battlenetId?: string;
  email?: string;
  name?: string;
  avatar?: string;
  characters: Character[];
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: "dark" | "light";
  defaultCharacter?: string;
  notifications: boolean;
  autoSync: boolean;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Battle.net API types
export interface BattlenetCharacterProfile {
  id: number;
  name: string;
  realm: {
    name: string;
    slug: string;
  };
  character_class: {
    name: string;
    id: number;
  };
  race: {
    name: string;
    id: number;
  };
  level: number;
  item_level: number;
  faction: {
    type: "ALLIANCE" | "HORDE";
    name: string;
  };
  guild?: {
    name: string;
    realm: {
      name: string;
      slug: string;
    };
  };
  active_spec?: {
    name: string;
    id: number;
  };
}