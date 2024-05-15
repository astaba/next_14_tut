"use client";
export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <p className="font-bold">
        <span className="text-4xl">ERROR:</span> {error.message}
      </p>
    </div>
  );
}
