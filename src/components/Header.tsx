import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Header() {
  return (
    <header className="border-b-2 border-cyan-400 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <div className="relative shrink-0 animate-pulse-glow">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-cyan-400 to-magenta-500 rounded-lg flex items-center justify-center transition-transform hover:scale-110">
                <span className="text-xl sm:text-2xl font-bold text-black">N</span>
              </div>
              <div className="absolute inset-0 bg-linear-to-br from-cyan-400 to-magenta-500 rounded-lg blur-md opacity-50 -z-10"></div>
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-magenta-400 to-magenta-500 tracking-wider truncate">
                NEONSYNC
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">On-chain actions. Off-chain speed.</p>
            </div>
          </div>
          <div className="shrink-0">
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
}
