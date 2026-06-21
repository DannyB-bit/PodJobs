import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-slate-100 bg-[#03060B] font-mono">
      <h2 className="text-xl font-bold tracking-tight text-cyan-400">404 // ROUTE_NOT_FOUND</h2>
      <p className="text-xs text-slate-400 mt-2 max-w-md text-center">
        The requested parallel orchestrator swarm address is unregistered in this sandbox virtual network.
      </p>
    </div>
  );
}
