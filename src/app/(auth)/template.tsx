"use client";
import React, { useState } from "react";

export default function AuthRootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [text, setText] = useState("");

  return (
    <>
      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="m-1 rounded border border-sky-300 px-2 font-bold"
        />
      </div>
      {children}
    </>
  );
}
