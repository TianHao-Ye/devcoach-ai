import { Brand } from "./brand";

export const PageHeader = () => (
  <header className="border-b border-black/5 bg-white/55 backdrop-blur-xl">
    <div className="mx-auto flex h-18 max-w-6xl items-center px-5 sm:px-8">
      <Brand href="/dashboard" />
      <span className="ml-4 hidden border-l border-black/10 pl-4 text-xs font-medium text-muted-foreground sm:block">AI career workspace</span>
    </div>
  </header>
);
