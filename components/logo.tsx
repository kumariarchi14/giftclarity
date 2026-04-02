import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

type LogoProps = {
  href?: string;
  size?: "hero" | "page";
  className?: string;
};

export function Logo({ href = "/", size = "page", className }: LogoProps) {
  const width = size === "hero" ? 280 : 210;
  const height = size === "hero" ? 78 : 58;

  const image = (
    <Image
      src="/giftclarity-logo.svg"
      alt="GiftClarity"
      width={width}
      height={height}
      priority
      className={clsx("h-auto w-auto max-w-full", size === "hero" ? "max-h-[58px]" : "max-h-[42px]", className)}
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
