"use client";

import React, { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global system error caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex flex-col items-center justify-center min-h-screen text-slate-100 bg-[#03060B] font-mono px-4">
        <h2 className="text-xl font-bold tracking-tight text-[#EA4335]">GLOBAL // SYSTEM_FAULT</h2>
        <p className="text-xs text-slate-400 mt-2 max-w-md text-center">
          The top-level application framework has encountered a critical error.
        </p>
        <button
          onClick={() => reset()}
          className="mt-6 px-4 py-2 bg-[#EA4335]/20 hover:bg-[#EA4335]/30 text-[#EA4335] text-xs font-bold border border-[#EA4335]/30 rounded-xl transition-all duration-200 cursor-pointer"
        >
          Reset Application
        </button>
      </body>
    </html>
  );
}
