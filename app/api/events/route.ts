import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const user = requireAuth(req as any); 

    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter"); 

    const now = new Date();
    let where: any = { userId: (user as any).id };

    if (filter === "upcoming") {
      where.dateTime = { gte: now }; 
    } else if (filter === "past") {
      where.dateTime = { lt: now }; 
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: { dateTime: "asc" },
    });

    return NextResponse.json(events);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Not authenticateds" }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const user = requireAuth(req as any); 
    const body = await req.json();
    const { title, dateTime, location, description } = body;

    if (!title || !dateTime || !location) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        title,
        dateTime: new Date(dateTime),
        location,
        description,
        userId: (user as any).id,
      },
    });

    return NextResponse.json(event);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
}
