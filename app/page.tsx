  "use client";

  import { useEffect, useState } from "react";
  import { useRouter } from "next/navigation";

  type Event = {
    id: string;
    title: string;
    dateTime: string;
    location: string;
    description?: string;
  };

  export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
      const fetchEvents = async () => {
        setLoading(true);
        setError("");

        let url = "/api/events";
        if (filter !== "all") url += `?filter=${filter}`;

        try {
          const res = await fetch(url, { credentials: "include" });
          if (!res.ok) {
            setEvents([]);
            return;
          }
          const data = await res.json();
          setEvents(Array.isArray(data) ? data : []);
        } catch (err) {
          console.error("Error fetching events:", err);
          setError("Could not load events. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchEvents();
    }, [filter]);

    const handleLogout = async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include",
        });
        if (res.ok) {
          router.push("/signin"); 
        }
      } catch (err) {
        console.error("Logout failed", err);
      }
    };

    const handlePush = () => {
      router.push("/create");
    }

    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex justify-between items-center mb-14">
          <h1 className="text-4xl font-bold">My Events</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition hover:cursor-pointer"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-3 mb-8">
          {["all", "upcoming", "past"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as "all" | "upcoming" | "past")}
              className={`px-4 py-2 rounded-md border hover:cursor-pointer ${
                filter === f ? "bg-green-600 text-white" : "bg-blue-600"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
          <button
            onClick={handlePush}
            className="text-white px-4 py-2 rounded hover:bg-blue-500 hover:cursor-pointer ml-70"
          >
            Create
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : events.length === 0 ? (
          <p>
            No events found.{" "}
            <a href="/create" className="text-blue-600 underline">
              Create one?
            </a>
          </p>
        ) : (
          <ul className="space-y-4">
            {events.map((event) => (
              <li
                key={event.id}
                className="border p-4 rounded-md shadow-sm hover:shadow-md"
              >
                <h2 className="text-lg font-semibold">{event.title}</h2>
                <p className="text-md text-gray-400">
                  {new Date(event.dateTime).toLocaleString()}
                </p>
                <p className="text-mds text-white my-4">📍 {event.location}</p>
                {event.description && (
                  <p className="mt-2 text-md text-white text-gray-700 ml-6">{event.description}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
