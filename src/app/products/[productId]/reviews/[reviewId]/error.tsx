"use client";
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <p className="font-bold">
        <span className="text-4xl text-red-500">ERROR:</span> {error.message}
      </p>
      <p>
        <button type="button" className="btn" onClick={reset}>
          Try again
        </button>
      </p>
    </div>
  );
}
