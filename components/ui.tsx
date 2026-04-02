import clsx from "clsx";
import type { ReactNode } from "react";

export function Shell({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={clsx("mx-auto flex w-full max-w-7xl justify-center px-2 sm:px-4 lg:px-8", className)}>{children}</div>;
}

export function Card({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={clsx("card rounded-[22px]", className)}>{children}</div>;
}

export function PillButton({
  active,
  children,
  onClick
}: {
  active?: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "rounded-full border px-3 py-1 text-[11px] leading-4 transition",
        active
          ? "border-[var(--accent)] bg-[var(--accent)] text-white"
          : "border-[color:var(--border)] bg-white/70 text-[color:var(--foreground)] hover:border-[var(--accent)]"
      )}
    >
      {children}
    </button>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
      {children}
    </p>
  );
}

export function PhoneFrame({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="mx-auto flex w-full justify-center">
      <div
        style={{
          width: "min(calc(100vw - 1rem), calc((100dvh - 1rem) * 731 / 1607), 92vw)",
          aspectRatio: "731 / 1607",
          minWidth: "280px",
          maxWidth: "560px",
          maxHeight: "calc(100dvh - 1rem)"
        }}
        className={clsx(
          "card overflow-hidden rounded-[24px] border border-white/60 p-1 shadow-[0_18px_42px_rgba(44,34,23,0.12)] sm:rounded-[28px] sm:p-1.5 lg:rounded-[32px]",
          className
        )}
      >
        <div className="flex h-full min-h-0 flex-col rounded-[20px] bg-[linear-gradient(180deg,rgba(255,252,247,0.98),rgba(247,241,233,0.94))] sm:rounded-[22px] lg:rounded-[25px]">
          {children}
        </div>
      </div>
    </div>
  );
}

export function PhoneScreen({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={clsx("flex h-full min-h-0 flex-col", className)}>{children}</div>;
}

export function PhoneHeader({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={clsx("shrink-0 px-2.5 pb-1.5 pt-2.5 sm:px-3 sm:pb-2 sm:pt-3", className)}>{children}</div>;
}

export function PhoneBody({
  children,
  className,
  scroll = true
}: {
  children: ReactNode;
  className?: string;
  scroll?: boolean;
}) {
  return (
    <div
      className={clsx(
        "min-h-0 flex-1 px-2.5 sm:px-3",
        scroll ? "overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" : "",
        className
      )}
    >
      {children}
    </div>
  );
}

export function PhoneFooter({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={clsx("shrink-0 px-2.5 pb-2.5 pt-1.5 sm:px-3 sm:pb-3 sm:pt-2", className)}>{children}</div>;
}
