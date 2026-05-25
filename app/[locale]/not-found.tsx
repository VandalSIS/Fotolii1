import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-700">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">Page not found</h1>
      <p className="mt-3 text-ink-600">
        Pagina căutată nu există. / Запрашиваемая страница не существует.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Home
      </Link>
    </div>
  );
}
