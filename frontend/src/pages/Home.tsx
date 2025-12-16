// moved from App.tsx to Home.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type HealthStatus = "loading" | "ok" | "error";
type AvatarState = "idle" | "ready" | "win" | "tired";

export default function Home() {
    const nav = useNavigate();
    const [status, setStatus] = useState<HealthStatus>("loading");
    const [avatarState, setAvatarState] = useState<AvatarState>("idle");

    async function fetchAvatarState() {
        try {
            const res = await fetch("/api/avatar-state");
            if (!res.ok) throw new Error("bad response");
            const data = await res.json();
            setStatus("ok");
            setAvatarState(data.avatarState as AvatarState);
        } catch {
            setStatus("error");
        }
    }

    useEffect(() => {
        fetchAvatarState();
    }, []);

    async function logWorkoutTest() {
        await fetch("/api/workouts", { method: "POST" });
        await fetchAvatarState();
    }

    return (
        <div className="px-5 pt-6">
            <h1 className="text-[18px] font-semibold">Home</h1>

            <div className="mt-4 text-sm text-[#6B7280]">
                Backend status:{" "}
                <span className={status === "ok" ? "text-green-600" : status === "error" ? "text-red-600" : "text-yellow-600"}>
                    {status}
                </span>
                {" · "}
                avatarState: <span className="font-semibold text-[#1F2933]">{avatarState}</span>
            </div>

            <div className="mt-4 flex gap-3">
                <button
                    className="h-11 px-5 rounded-full bg-[#6366F1] text-white font-medium"
                    onClick={() => nav("/log")}
                >
                    Log today’s session
                </button>

                <button
                    className="h-11 px-5 rounded-full border border-[#E5E7EB] text-[#6B7280] font-medium"
                    onClick={logWorkoutTest}
                >
                    Log workout (test)
                </button>
            </div>
        </div>
    );
}
