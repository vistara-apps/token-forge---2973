import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

const Header = () => {
  const { isConnected } = useAccount();

  return (
    <header className="glass-effect border-b border-white/10 p-4 lg:p-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">TF</span>
          </div>
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-white">Token Forge</h1>
            <p className="text-blue-200 text-sm">Base Sepolia Testnet</p>
          </div>
        </div>
        
        {isConnected && (
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-blue-200">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Base Sepolia</span>
            </div>
            <ConnectButton />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;