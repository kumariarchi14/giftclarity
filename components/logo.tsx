import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import clsx from "clsx";

type LogoProps = {
  href?: Route;
  size?: "hero" | "page";
  className?: string;
};

export function Logo({ href = "/", size = "page", className }: LogoProps) {
  const width = size === "hero" ? 260 : 186;
  const height = size === "hero" ? 72 : 52;

  const image = (
    <Image
      src="/giftclarity-logo.svg"
      alt="GiftClarity"
      width={width}
      height={height}
      priority
      className={clsx("h-auto w-auto max-w-full", size === "hero" ? "max-h-[52px]" : "max-h-[36px]", className)}
    />
  );

  if (!href) {
    return image;
  }

  return (
    <Link href={href} aria-label="GiftClarity home" className="inline-flex items-center">
      {image}
    </Link>
  );
}
