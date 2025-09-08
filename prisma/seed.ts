import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"

async function main() {
  const users = [
    {
      name: "Alice",
      email: "alice@example.com",
      password: "alice123",
      events: [
        {
          title: "Alice Birthday Party",
          dateTime: new Date("2025-09-12T18:00:00Z"),
          location: "Alice's House",
          description: "Don't forget the cake",
        },
      ],
    },
    {
      name: "Bob",
      email: "bob@example.com",
      password: "bob123",
      events: [
        {
          title: "Bob Coding Meetup",
          dateTime: new Date("2025-09-15T15:00:00Z"),
          location: "Downtown Cafe",
          description: "React + GoLang talks",
        },
        {
          title: "Bob Gym Session",
          dateTime: new Date("2025-09-16T06:30:00Z"),
          location: "Gold’s Gym",
        },
      ],
    },
    {
      name: "Carol",
      email: "carol@example.com",
      password: "carol123",
      events: [],
    },
  ];

  for (const u of users) {
    const hashed = await bcrypt.hash(u.password, 10);
    await prisma.user.create({
      data: {
        name: u.name,
        email: u.email,
        password: hashed,
        events: {
          create: u.events,
        },
      },
    });
  }

  console.log("Seeded multiple users + events with names");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
