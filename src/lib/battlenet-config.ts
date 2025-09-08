// Battle.net API configuration
export const BATTLENET_CONFIG = {
  // Region configuration
  regions: {
    US: 'us',
    EU: 'eu',
    KR: 'kr',
    TW: 'tw',
    CN: 'cn'
  },

  // API endpoints
  endpoints: {
    oauth: {
      authorize: 'https://oauth.battle.net/authorize',
      token: 'https://oauth.battle.net/token',
    },
    api: {
      base: (region: string) => `https://${region}.api.blizzard.com`,
      profile: (region: string) => `${BATTLENET_CONFIG.endpoints.api.base(region)}/profile`,
      data: (region: string) => `${BATTLENET_CONFIG.endpoints.api.base(region)}/data`,
    }
  },

  // WoW API specific endpoints
  wow: {
    character: {
      profile: (region: string, realm: string, character: string) => 
        `${BATTLENET_CONFIG.endpoints.api.base(region)}/profile/wow/character/${realm}/${character}`,
      equipment: (region: string, realm: string, character: string) =>
        `${BATTLENET_CONFIG.endpoints.api.base(region)}/profile/wow/character/${realm}/${character}/equipment`,
      achievements: (region: string, realm: string, character: string) =>
        `${BATTLENET_CONFIG.endpoints.api.base(region)}/profile/wow/character/${realm}/${character}/achievements`,
      mythicKeystoneProfile: (region: string, realm: string, character: string) =>
        `${BATTLENET_CONFIG.endpoints.api.base(region)}/profile/wow/character/${realm}/${character}/mythic-keystone-profile`,
      reputations: (region: string, realm: string, character: string) =>
        `${BATTLENET_CONFIG.endpoints.api.base(region)}/profile/wow/character/${realm}/${character}/reputations`,
    },
    realm: {
      list: (region: string) => 
        `${BATTLENET_CONFIG.endpoints.data.base(region)}/wow/realm/index`,
      details: (region: string, realm: string) =>
        `${BATTLENET_CONFIG.endpoints.data.base(region)}/wow/realm/${realm}`,
    },
    guild: {
      profile: (region: string, realm: string, guild: string) =>
        `${BATTLENET_CONFIG.endpoints.data.base(region)}/wow/guild/${realm}/${guild}`,
      roster: (region: string, realm: string, guild: string) =>
        `${BATTLENET_CONFIG.endpoints.data.base(region)}/wow/guild/${realm}/${guild}/roster`,
    }
  },

  // OAuth scopes needed for different features
  scopes: {
    read_character: 'wow.profile',
    read_user_info: 'openid',
  },

  // Rate limiting information
  rateLimits: {
    requestsPerSecond: 100,
    requestsPerHour: 36000,
  },

  // Cache configuration
  cache: {
    character: {
      profile: 15 * 60, // 15 minutes
      equipment: 5 * 60, // 5 minutes
      achievements: 60 * 60, // 1 hour
      mythicKeystone: 60 * 60, // 1 hour
      reputations: 30 * 60, // 30 minutes
    },
    realm: 24 * 60 * 60, // 24 hours
    guild: 30 * 60, // 30 minutes
  }
};

// Helper function to get API URL for character profile
export function getCharacterProfileUrl(region: string, realm: string, character: string): string {
  return BATTLENET_CONFIG.wow.character.profile(region, realm.toLowerCase(), character.toLowerCase());
}

// Helper function to get API URL for character equipment
export function getCharacterEquipmentUrl(region: string, realm: string, character: string): string {
  return BATTLENET_CONFIG.wow.character.equipment(region, realm.toLowerCase(), character.toLowerCase());
}

// Helper function to get API URL for character achievements
export function getCharacterAchievementsUrl(region: string, realm: string, character: string): string {
  return BATTLENET_CONFIG.wow.character.achievements(region, realm.toLowerCase(), character.toLowerCase());
}

// Helper function to get API URL for character mythic keystone profile
export function getCharacterMythicKeystoneUrl(region: string, realm: string, character: string): string {
  return BATTLENET_CONFIG.wow.character.mythicKeystoneProfile(region, realm.toLowerCase(), character.toLowerCase());
}

// Helper function to get API URL for character reputations
export function getCharacterReputationsUrl(region: string, realm: string, character: string): string {
  return BATTLENET_CONFIG.wow.character.reputations(region, realm.toLowerCase(), character.toLowerCase());
}

// Environment variables that should be set
export const REQUIRED_ENV_VARS = {
  BATTLENET_CLIENT_ID: process.env.BATTLENET_CLIENT_ID,
  BATTLENET_CLIENT_SECRET: process.env.BATTLENET_CLIENT_SECRET,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
};

// Validate environment variables
export function validateEnvironment(): { valid: boolean; missing: string[] } {
  const missing: string[] = [];
  
  Object.entries(REQUIRED_ENV_VARS).forEach(([key, value]) => {
    if (!value) {
      missing.push(key);
    }
  });

  return {
    valid: missing.length === 0,
    missing
  };
}