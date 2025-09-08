import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatItemLevel(ilvl: number): string {
  return `${ilvl} ilvl`;
}

export function formatReputationLevel(standing: string): string {
  const levels = {
    'hated': 'Hated',
    'hostile': 'Hostile', 
    'unfriendly': 'Unfriendly',
    'neutral': 'Neutral',
    'friendly': 'Friendly',
    'honored': 'Honored',
    'revered': 'Revered',
    'exalted': 'Exalted'
  };
  return levels[standing as keyof typeof levels] || standing;
}

export function getClassColor(className: string): string {
  const classColors = {
    'warrior': '#C79C6E',
    'paladin': '#F58CBA',
    'hunter': '#ABD473',
    'rogue': '#FFF569',
    'priest': '#FFFFFF',
    'shaman': '#0070DE',
    'mage': '#40C7EB',
    'warlock': '#8787ED',
    'monk': '#00FF96',
    'druid': '#FF7D0A',
    'demon hunter': '#A330C9',
    'death knight': '#C41F3B',
    'evoker': '#33937F'
  };
  return classColors[className.toLowerCase() as keyof typeof classColors] || '#FFFFFF';
}

export function getRaceIcon(race: string): string {
  // Placeholder for race icons - would be implemented with actual WoW race icons
  return `/icons/races/${race.toLowerCase().replace(' ', '-')}.jpg`;
}

export function getClassIcon(className: string): string {
  // Placeholder for class icons - would be implemented with actual WoW class icons
  return `/icons/classes/${className.toLowerCase().replace(' ', '-')}.jpg`;
}