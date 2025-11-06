import React from 'react';

const Sidebar = ({ tools, activeTab, setActiveTab }) => {
  return (
    <aside className="w-full lg:w-80 glass-effect border-r border-white/10 p-4 lg:p-6 animate-fade-in-up">
      <div className="space-y-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-2 animate-shimmer">Tools</h2>
          <p className="text-blue-200 text-sm">Select a tool to get started</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTab(tool.id)}
                className={`p-4 rounded-xl text-left transition-all duration-300 card-hover animate-fade-in-up ${
                  activeTab === tool.id
                    ? 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border border-blue-400/50 shadow-lg animate-pulse-glow'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${tool.color} flex items-center justify-center mb-3 shadow-md transform hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">{tool.title}</h3>
                <p className="text-blue-200 text-xs">{tool.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;