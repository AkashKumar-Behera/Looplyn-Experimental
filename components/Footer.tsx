import { NAV_LINKS } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded-full bg-gradient-to-tr from-primary to-secondary" />
              <span className="text-lg font-semibold tracking-tight">LOOPLYN</span>
            </div>
            <p className="mt-4 text-sm text-muted">
              Where brands get seen. A premium growth studio for ambitious teams.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-10 gap-y-3">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Looplyn. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
            <a href="#" className="hover:text-white">X / Twitter</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
