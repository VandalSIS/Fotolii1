import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/admin-auth";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAuthed()) redirect("/admin");
  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-cream-100 via-cream-50 to-cream-100 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-700">MasajGO</p>
          <h1 className="mt-2 font-display text-3xl font-normal tracking-tight text-ink-900">
            Panou administrare
          </h1>
          <p className="mt-2 text-sm text-ink-600">Introdu parola pentru a gestiona stocurile.</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
