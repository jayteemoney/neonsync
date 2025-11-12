import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Header() {
  return (
    <header className="border-b-2 border-cyan-400 bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-magenta-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-black">N</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-magenta-500 rounded-lg blur-md opacity-50"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-500 tracking-wider">
                NEONSYNC
              </h1>
              <p className="text-sm text-gray-400">On-chain actions. Off-chain speed.</p>
            </div>
          </div>
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
