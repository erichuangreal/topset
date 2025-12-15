import { useEffect, useState } from "react";

type HealthStatus = "loading" | "ok" | "error";
type AvatarState = "idle" | "ready" | "win" | "tired";

function App() {
  const [status, setStatus] = useState<HealthStatus>("loading");
  const [avatarState, setAvatarState] = useState<AvatarState>("idle");

  async function fetchAvatarState() {
    try {
      const res = await fetch("http://localhost:3000/api/avatar-state");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      // expecting AvatarState
      setStatus("ok");
      setAvatarState(data.avatarState as AvatarState);
    } catch (err) {
      console.error("Error fetching avatar state:", err);
      setStatus("error");
    }
  }

  useEffect(() => {
    fetchAvatarState();
  }, []);

  async function logWorkout() {
    await fetch("http://localhost:3000/api/workouts", { method: "POST" });
    await fetchAvatarState();
  }
  // remember to use tailwind syntax, NOT jsx style syntax
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex justify-center p-6">
      <div className="w-full max-w-md flex flex-col items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-center leading-tight">
          Lifting Tracker – Dev Mode
        </h1>

        <div className="w-full aspect-square max-w-sm rounded-2xl border border-white/15 bg-white/5 shadow-sm flex flex-col items-center justify-center gap-2">
          <div className="text-sm opacity-70">AVATAR STATE</div>
          <div className="text-4xl font-extrabold">{avatarState}</div>
        </div>

        <button
          onClick={logWorkout}
          className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 transition font-semibold"
        >
          Log workout (test)
        </button>

        <p className="text-base">
          Backend status:{" "}
          <strong
            className={
              status === "ok"
                ? "text-green-500"
                : status === "error"
                  ? "text-red-500"
                  : "text-yellow-400"
            }
          >
            {status}
          </strong>
        </p>

        <p className="text-sm opacity-80">Full stack is ONLINE!</p>
      </div>
    </div>
  );
}
export default App;