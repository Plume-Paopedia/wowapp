"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, Target, CheckCircle, Clock, Trash2 } from "lucide-react";
import { useState } from "react";

interface Objective {
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
}

// Mock data for demonstration
const mockObjectives: Objective[] = [
  {
    id: "1",
    title: "Reach 600 Item Level",
    description: "Upgrade gear to reach 600 average item level",
    category: "Item Level",
    progress: 580,
    target: 600,
    unit: "ilvl",
    priority: "High",
    deadline: "2024-01-31",
    completed: false,
    character: "Thalarion"
  },
  {
    id: "2",
    title: "Complete Mythic+ 15",
    description: "Successfully complete a +15 keystone dungeon",
    category: "Mythic+",
    progress: 12,
    target: 15,
    unit: "key level",
    priority: "Medium",
    completed: false,
    character: "Shadowmoon"
  },
  {
    id: "3",
    title: "Exalted with Dream Wardens",
    description: "Reach Exalted reputation with Dream Wardens",
    category: "Reputation",
    progress: 18500,
    target: 21000,
    unit: "reputation",
    priority: "Medium",
    completed: false,
    character: "Flamestrike"
  },
  {
    id: "4",
    title: "Clear Nerub-ar Palace Mythic",
    description: "Defeat all bosses in Nerub-ar Palace on Mythic difficulty",
    category: "Raids",
    progress: 6,
    target: 8,
    unit: "bosses",
    priority: "High",
    deadline: "2024-02-15",
    completed: false,
    character: "Thalarion"
  },
  {
    id: "5",
    title: "Obtain BiS Trinket",
    description: "Get Spymaster's Web from Queen Ansurek",
    category: "Custom",
    progress: 12,
    target: 20,
    unit: "attempts",
    priority: "High",
    completed: false,
    character: "Shadowmoon"
  },
  {
    id: "6",
    title: "Level Alt to 80",
    description: "Get Ironbeard to max level",
    category: "Custom",
    progress: 75,
    target: 80,
    unit: "level",
    priority: "Low",
    completed: false,
    character: "Ironbeard"
  }
];

const categoryColors = {
  "Item Level": "#f4c430",
  "Raids": "#dc2626",
  "Mythic+": "#7c3aed",
  "Reputation": "#059669",
  "Achievements": "#ea580c",
  "Custom": "#6b7280"
};

const priorityColors = {
  "Low": "#6b7280",
  "Medium": "#f59e0b",
  "High": "#dc2626"
};

export default function ObjectivesPage() {
  const [objectives, setObjectives] = useState<Objective[]>(mockObjectives);
  const [filter, setFilter] = useState<"All" | "Active" | "Completed">("Active");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  const filteredObjectives = objectives.filter(obj => {
    const statusMatch = filter === "All" || 
                       (filter === "Active" && !obj.completed) ||
                       (filter === "Completed" && obj.completed);
    const categoryMatch = categoryFilter === "All" || obj.category === categoryFilter;
    return statusMatch && categoryMatch;
  });

  const completeObjective = (id: string) => {
    setObjectives(prev => prev.map(obj => 
      obj.id === id ? { ...obj, completed: true, progress: obj.target } : obj
    ));
  };

  const deleteObjective = (id: string) => {
    setObjectives(prev => prev.filter(obj => obj.id !== id));
  };

  const getProgressPercentage = (progress: number, target: number) => {
    return Math.min((progress / target) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Objectives</h1>
          <p className="text-muted-foreground">
            Set and track your World of Warcraft goals
          </p>
        </div>
        <button className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-accent transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Objective</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Objectives</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{objectives.length}</div>
            <p className="text-xs text-muted-foreground">
              Across all characters
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {objectives.filter(obj => obj.completed).length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((objectives.filter(obj => obj.completed).length / objectives.length) * 100)}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {objectives.filter(obj => !obj.completed).length}
            </div>
            <p className="text-xs text-muted-foreground">
              In progress
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as "All" | "Active" | "Completed")}
                className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="All">All Objectives</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="All">All Categories</option>
                <option value="Item Level">Item Level</option>
                <option value="Raids">Raids</option>
                <option value="Mythic+">Mythic+</option>
                <option value="Reputation">Reputation</option>
                <option value="Achievements">Achievements</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Objectives List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-primary">
          {filteredObjectives.length} Objective{filteredObjectives.length !== 1 ? 's' : ''}
        </h2>
        
        {filteredObjectives.length > 0 ? (
          <div className="space-y-4">
            {filteredObjectives.map((objective) => (
              <Card key={objective.id} className={objective.completed ? "opacity-75" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <CardTitle className={objective.completed ? "line-through" : ""}>
                          {objective.title}
                        </CardTitle>
                        <span 
                          className="px-2 py-1 text-xs rounded-full"
                          style={{ 
                            backgroundColor: categoryColors[objective.category] + "20",
                            color: categoryColors[objective.category]
                          }}
                        >
                          {objective.category}
                        </span>
                        <span 
                          className="px-2 py-1 text-xs rounded-full"
                          style={{ 
                            backgroundColor: priorityColors[objective.priority] + "20",
                            color: priorityColors[objective.priority]
                          }}
                        >
                          {objective.priority} Priority
                        </span>
                      </div>
                      <CardDescription>{objective.description}</CardDescription>
                      {objective.character && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Character: {objective.character}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {!objective.completed && (
                        <button 
                          onClick={() => completeObjective(objective.id)}
                          className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg transition-colors"
                          title="Mark as completed"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                      <button 
                        onClick={() => deleteObjective(objective.id)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete objective"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">
                        {objective.progress}/{objective.target} {objective.unit}
                      </span>
                    </div>
                    <Progress 
                      value={objective.progress}
                      max={objective.target}
                      variant={objective.completed ? "success" : "primary"}
                    />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {getProgressPercentage(objective.progress, objective.target).toFixed(1)}% complete
                      </span>
                      {objective.deadline && (
                        <span>
                          Due: {new Date(objective.deadline).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  No objectives found
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Try adjusting your filters or create your first objective
                </p>
                <button className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-accent transition-colors">
                  <Plus className="h-4 w-4" />
                  <span>Add Your First Objective</span>
                </button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}