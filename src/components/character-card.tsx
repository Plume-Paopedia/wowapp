"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn, getClassColor, formatItemLevel } from "@/lib/utils";

interface Character {
  id: string;
  name: string;
  realm: string;
  class: string;
  race: string;
  level: number;
  itemLevel: number;
  faction: "Alliance" | "Horde";
  avatar?: string;
}

interface CharacterCardProps {
  character: Character;
  className?: string;
  onSelect?: (character: Character) => void;
}

export function CharacterCard({ character, className, onSelect }: CharacterCardProps) {
  const classColor = getClassColor(character.class);
  const factionColor = character.faction === "Alliance" ? "var(--blue-alliance)" : "var(--red-horde)";
  
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-primary/20",
        className
      )}
      onClick={() => onSelect?.(character)}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
            {character.avatar ? (
              <img 
                src={character.avatar} 
                alt={character.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div 
                className="w-full h-full rounded-full flex items-center justify-center text-lg font-bold"
                style={{ backgroundColor: classColor + "20", color: classColor }}
              >
                {character.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex-1">
            <CardTitle 
              className="text-lg"
              style={{ color: classColor }}
            >
              {character.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Level {character.level} {character.race} {character.class}
            </p>
            <p className="text-xs" style={{ color: factionColor }}>
              {character.realm} - {character.faction}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Item Level</span>
            <span className="text-sm font-bold text-primary">
              {formatItemLevel(character.itemLevel)}
            </span>
          </div>
          
          <Progress 
            value={character.level} 
            max={80} 
            label="Level Progress"
            variant="primary"
          />
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{character.itemLevel}</div>
              <div className="text-xs text-muted-foreground">Item Level</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{character.level}/80</div>
              <div className="text-xs text-muted-foreground">Level</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}