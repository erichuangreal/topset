import { useEffect, useState } from "react";

type HealthStatus = "loading" | "ok" | "error";

function App() {
  const [status, setStatus] = useState<HealthStatus>("loading");

  useEffect(() => {
    async function fetchHealth() {
      try {
        const res = await fetch("http://localhost:3000/health");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();

        // expecting { status: "ok" }
        if (data.status === "ok") {
          setStatus("ok");
        } else {
          setStatus("error");
        }
      } catch (err) {
        console.error("Error fetching health:", err);
        setStatus("error");
      }
    }

    fetchHealth();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
        background: "#020617",
        color: "white",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>
        Lifting Tracker – Dev Mode
      </h1>

      <p>
        Backend status:{" "}
        <strong
          style={{
            color:
              status === "ok"
                ? "#22c55e"
                : status === "error"
                  ? "#ef4444"
                  : "#eab308",
          }}
        >
          {status}
        </strong>
      </p>

      <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
        Full stack is ONLINE!
      </p>
    </div>
  );
}

export default App;
