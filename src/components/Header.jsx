import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

const Header = () => {
  const { isConnected } = useAccount();

  return (
    <header className="glass-effect border-b border-white/10 p-4 lg:p-6 animate-fade-in-up">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-xl flex items-center justify-center animate-pulse-glow shadow-lg">
            <span className="text-white font-bold text-xl">TF</span>
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Token Forge
            </h1>
            <p className="text-blue-200 text-sm animate-shimmer">Base Sepolia Testnet</p>
          </div>
        </div>

        {isConnected && (
          <div className="flex items-center space-x-4 animate-fade-in-up">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-blue-200 bg-white/5 px-3 py-2 rounded-full border border-white/10">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
              <span className="font-medium">Base Sepolia</span>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-200">
              <ConnectButton />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;