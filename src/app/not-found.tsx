import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-black px-4 text-center">
      <h1 className="font-[family-name:var(--font-display)] text-8xl text-brand-accent">
        404
      </h1>
      <p className="mt-4 text-xl text-brand-muted">Page not found</p>
      <Link
        href="/mk"
        className="mt-8 inline-flex rounded-sm bg-brand-accent px-8 py-3 text-sm font-semibold uppercase tracking-wider text-brand-black transition-colors hover:bg-brand-accent-hover"
      >
        Home
      </Link>
    </div>
  );
}
