import prisma from "@/lib/prisma"

type Props = {
  params: { id: string }
}

export default async function PublicUserPage({ params }: Props) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: {
      name: true,
      events: {
        select: {
          id: true,
          title: true,
          dateTime: true,
          location: true,
          description: true,
        },
      },
    },
  });

  if (!user) {
    return <div className="p-6">User not found</div>
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{user.name}’s Events</h1>
      {user.events.length === 0 ? (
        <p>No events yet.</p>
      ) : (
        <ul className="space-y-4">
          {user.events.map((event: any) => (
            <li key={event.id} className="border p-4 rounded-md shadow-sm">
              <h2 className="font-semibold">{event.title}</h2>
              <p className="text-sm text-gray-600">
                {new Date(event.dateTime).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">{event.location}</p>
              {event.description && (
                <p className="mt-2 text-gray-700">{event.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
