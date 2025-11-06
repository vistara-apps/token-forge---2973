import React from 'react';
import { ExternalLink, Copy, Coins } from 'lucide-react';

const TokenDashboard = ({ tokens }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  if (tokens.length === 0) {
    return (
      <div className="glass-effect rounded-2xl p-8 text-center animate-fade-in-up">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow shadow-lg">
          <Coins className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">No Tokens Created Yet</h2>
        <p className="text-blue-200 mb-6">Create your first ERC20 token to see it here</p>
        <div className="animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent h-1 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="glass-effect rounded-2xl p-6 lg:p-8 animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">My Tokens</h2>
            <p className="text-blue-200">Manage your created ERC20 tokens</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 px-4 py-2 rounded-lg border border-blue-400/30 animate-pulse-glow">
            <span className="text-blue-200 text-sm">Total: </span>
            <span className="text-white font-semibold">{tokens.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {tokens.map((token, index) => (
            <div 
              key={index} 
              className="bg-white/5 border border-white/10 rounded-xl p-6 card-hover animate-fade-in-up shadow-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md animate-pulse-glow">
                    <span className="text-white font-bold text-lg">
                      {token.symbol.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{token.name}</h3>
                    <p className="text-blue-200 text-sm">{token.symbol}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-200 text-sm">Supply:</span>
                  <span className="text-white font-medium">
                    {formatNumber(token.initialSupply)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-blue-200 text-sm">Decimals:</span>
                  <span className="text-white font-medium">{token.decimals}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-blue-200 text-sm">Contract:</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-mono text-sm">
                      {formatAddress(token.contractAddress)}
                    </span>
                    <button
                      onClick={() => copyToClipboard(token.contractAddress)}
                      className="text-blue-400 hover:text-blue-300 transition-colors transform hover:scale-110 duration-200"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-blue-200 text-sm">Created:</span>
                  <span className="text-white text-sm">
                    {new Date(token.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex space-x-2">
                <a
                  href={`https://sepolia.basescan.org/address/${token.contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300 flex items-center justify-center space-x-2 border border-blue-400/30 hover:border-blue-400/50 transform hover:scale-105"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View on BaseScan</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenDashboard;