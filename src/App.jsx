import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TokenCreator from './components/TokenCreator';
import TokenDashboard from './components/TokenDashboard';
import { Coins, Zap, Settings, History } from 'lucide-react';

function App() {
  const { isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState('create');
  const [createdTokens, setCreatedTokens] = useState([]);

  const tools = [
    {
      id: 'create',
      title: 'Token Creator',
      description: 'Create custom ERC20 tokens',
      icon: Coins,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'dashboard',
      title: 'My Tokens',
      description: 'Manage your created tokens',
      icon: Zap,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Configure your preferences',
      icon: Settings,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'history',
      title: 'Transaction History',
      description: 'View your transaction history',
      icon: History,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const handleTokenCreated = (tokenData) => {
    setCreatedTokens(prev => [...prev, tokenData]);
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar */}
        <Sidebar tools={tools} activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header />
          
          {/* Content Area */}
          <main className="flex-1 p-4 lg:p-8">
            {!isConnected ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="glass-effect rounded-2xl p-8 max-w-md mx-auto">
                    <Coins className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-4">Welcome to Token Forge</h2>
                    <p className="text-blue-200 mb-6">Connect your wallet to start creating custom ERC20 tokens on Base Sepolia testnet</p>
                    <ConnectButton />
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-7xl mx-auto">
                {activeTab === 'create' && (
                  <TokenCreator onTokenCreated={handleTokenCreated} />
                )}
                {activeTab === 'dashboard' && (
                  <TokenDashboard tokens={createdTokens} />
                )}
                {activeTab === 'settings' && (
                  <div className="glass-effect rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Settings</h2>
                    <p className="text-blue-200">Settings panel coming soon...</p>
                  </div>
                )}
                {activeTab === 'history' && (
                  <div className="glass-effect rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Transaction History</h2>
                    <p className="text-blue-200">Transaction history coming soon...</p>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;