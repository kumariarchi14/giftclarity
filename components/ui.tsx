import clsx from "clsx";
import type { ReactNode } from "react";

export function Shell({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={clsx("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}

export function Card({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={clsx("card rounded-[24px]", className)}>{children}</div>;
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
        "rounded-full border px-3.5 py-1.5 text-[12px] transition",
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
    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
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
    <div className="mx-auto w-fit">
      <div
        style={{
          width: "7.31cm",
          height: "16.07cm"
        }}
        className={clsx(
          "card overflow-hidden rounded-[34px] border border-white/60 p-2 shadow-[0_24px_60px_rgba(44,34,23,0.12)]",
          className
        )}
      >
        <div className="flex h-full min-h-0 flex-col rounded-[27px] bg-[linear-gradient(180deg,rgba(255,252,247,0.98),rgba(247,241,233,0.94))]">
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
  return <div className={clsx("shrink-0 px-3 pb-2 pt-3", className)}>{children}</div>;
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
    <div className={clsx("min-h-0 flex-1 px-3", scroll ? "overflow-y-auto overscroll-contain" : "", className)}>
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
  return <div className={clsx("shrink-0 px-3 pb-3 pt-2", className)}>{children}</div>;
}
