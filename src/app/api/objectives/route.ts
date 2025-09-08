import { NextRequest, NextResponse } from "next/server";
import { Objective, ApiResponse } from "@/types";

// Mock data - in a real app, this would come from a database
let mockObjectives: Objective[] = [
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
    character: "Thalarion",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date()
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
    character: "Shadowmoon",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date()
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
    character: "Flamestrike",
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date()
  }
];

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<Objective[]>>> {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const character = searchParams.get("character");

    let filteredObjectives = mockObjectives;

    // Filter by status
    if (status && status !== "All") {
      if (status === "Active") {
        filteredObjectives = filteredObjectives.filter(obj => !obj.completed);
      } else if (status === "Completed") {
        filteredObjectives = filteredObjectives.filter(obj => obj.completed);
      }
    }

    // Filter by category
    if (category && category !== "All") {
      filteredObjectives = filteredObjectives.filter(obj => obj.category === category);
    }

    // Filter by character
    if (character && character !== "All") {
      filteredObjectives = filteredObjectives.filter(obj => obj.character === character);
    }

    return NextResponse.json({
      success: true,
      data: filteredObjectives,
      message: `Found ${filteredObjectives.length} objectives`
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to fetch objectives",
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<Objective>>> {
  try {
    const body = await request.json();
    const { title, description, category, target, unit, priority, character, deadline } = body;

    // Validate required fields
    if (!title || !category || !target || !unit) {
      return NextResponse.json({
        success: false,
        error: "Missing required fields",
        message: "Title, category, target, and unit are required"
      }, { status: 400 });
    }

    const newObjective: Objective = {
      id: (mockObjectives.length + 1).toString(),
      title,
      description: description || "",
      category,
      progress: 0,
      target,
      unit,
      priority: priority || "Medium",
      deadline,
      completed: false,
      character,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockObjectives.push(newObjective);

    return NextResponse.json({
      success: true,
      data: newObjective,
      message: "Objective created successfully"
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to create objective",
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse<ApiResponse<Objective>>> {
  try {
    const body = await request.json();
    const { id, progress, completed } = body;

    if (!id) {
      return NextResponse.json({
        success: false,
        error: "Missing objective ID",
        message: "Objective ID is required"
      }, { status: 400 });
    }

    const objectiveIndex = mockObjectives.findIndex(obj => obj.id === id);
    if (objectiveIndex === -1) {
      return NextResponse.json({
        success: false,
        error: "Objective not found",
        message: "No objective found with the provided ID"
      }, { status: 404 });
    }

    const objective = mockObjectives[objectiveIndex];
    
    // Update fields
    if (progress !== undefined) {
      objective.progress = progress;
    }
    if (completed !== undefined) {
      objective.completed = completed;
      if (completed) {
        objective.progress = objective.target;
      }
    }
    
    objective.updatedAt = new Date();
    mockObjectives[objectiveIndex] = objective;

    return NextResponse.json({
      success: true,
      data: objective,
      message: "Objective updated successfully"
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to update objective",
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        error: "Missing objective ID",
        message: "Objective ID is required"
      }, { status: 400 });
    }

    const objectiveIndex = mockObjectives.findIndex(obj => obj.id === id);
    if (objectiveIndex === -1) {
      return NextResponse.json({
        success: false,
        error: "Objective not found",
        message: "No objective found with the provided ID"
      }, { status: 404 });
    }

    mockObjectives.splice(objectiveIndex, 1);

    return NextResponse.json({
      success: true,
      data: null,
      message: "Objective deleted successfully"
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to delete objective",
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}