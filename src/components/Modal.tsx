"use client";
import { useCallback, useRef, useEffect, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef(null);
  const wrapperRef = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlayRef.current || e.target === wrapperRef.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlayRef, wrapperRef],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlayRef}
      className="fixed bottom-0 left-0 right-0 top-0 z-10 mx-auto bg-black/60 p-10"
      onClick={onClick}
    >
      <div
        ref={wrapperRef}
        className="absolute left-1/2 top-1/2 w-2/3 -translate-x-1/2 -translate-y-1/2 p-6 sm:w-1/2 md:w-1/3 lg:w-3/12"
      >
        {children}
      </div>
    </div>
  );
}
