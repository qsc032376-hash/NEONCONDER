import React from 'react';
import { ProgrammingLanguage } from '../types';
import { Code, Terminal, Cpu, Zap, ShieldCheck, Layout, Layers, Smartphone } from 'lucide-react';

interface LandingProps {
  onSelectLanguage: (lang: ProgrammingLanguage) => void;
}

export const Landing: React.FC<LandingProps> = ({ onSelectLanguage }) => {
  
  const getIcon = (lang: ProgrammingLanguage) => {
    switch(lang) {
      case ProgrammingLanguage.PYTHON: return <Terminal size={32} />;
      case ProgrammingLanguage.JAVASCRIPT: return <Zap size={32} />;
      case ProgrammingLanguage.CPP: return <Cpu size={32} />;
      case ProgrammingLanguage.JAVA: return <Code size={32} />;
      case ProgrammingLanguage.HTML: return <Layout size={32} />;
      case ProgrammingLanguage.APP_DESIGN: return <Smartphone size={32} />;
      default: return <Code size={32} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-6">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyber-neonCyan/10 to-transparent pointer-events-none"></div>

      <div className="max-w-5xl w-full z-10 text-center space-y-12 mb-24">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-neonCyan to-cyber-neonPink drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
            NEON<span className="text-white">CODER</span>
          </h1>
          <p className="text-xl md:text-2xl text-cyber-neonCyan font-mono tracking-wider">
            INITIALIZE LEARNING PROTOCOL
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mx-auto">
          {Object.values(ProgrammingLanguage).map((lang) => (
            <button
              key={lang}
              onClick={() => onSelectLanguage(lang)}
              className="group relative bg-cyber-dark border border-cyber-gray hover:border-cyber-neonCyan p-8 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] flex items-center space-x-4 overflow-hidden"
            >
              <div className="absolute inset-0 bg-cyber-neonCyan/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              
              <div className="relative p-3 bg-cyber-black rounded border border-cyber-gray group-hover:border-cyber-neonCyan text-cyber-neonCyan">
                {getIcon(lang)}
              </div>
              
              <div className="text-left relative">
                <h3 className="text-lg font-display font-bold text-white group-hover:text-cyber-neonCyan">{lang}</h3>
                <p className="text-xs text-gray-400 font-mono">
                  {lang === ProgrammingLanguage.APP_DESIGN ? 'Full Stack Architect' : 'Master the syntax'}
                </p>
              </div>
              
              <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 bg-cyber-neonCyan rounded-full animate-ping"></div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="text-gray-500 font-mono text-sm pt-12">
          SYSTEM STATUS: <span className="text-green-500">ONLINE</span> | AI CORE: <span className="text-green-500">CONNECTED</span>
        </div>
      </div>

      {/* Anti-Counterfeiting Label 2025 */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center pointer-events-none">
        <div className="bg-cyber-black/90 border border-cyber-gray/50 backdrop-blur-sm rounded-md px-4 py-2 flex items-center gap-3 shadow-[0_0_15px_rgba(0,0,0,0.8)]">
            <ShieldCheck size={16} className="text-cyber-neonYellow" />
            <div className="flex flex-col text-left">
                <span className="text-[10px] text-gray-400 font-mono tracking-wider uppercase">Intellectual Property Protection</span>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-white font-display font-bold">VERIFIED © 2025</span>
                    <span className="h-1 w-1 bg-cyber-neonPink rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-cyber-neonCyan font-mono">ANTI-COUNTERFEIT: ACTIVE</span>
                </div>
            </div>
            <div className="border-l border-cyber-gray pl-3 ml-1 opacity-50">
                 <div className="w-6 h-6 border border-cyber-neonCyan rounded-sm flex items-center justify-center">
                     <div className="w-3 h-3 bg-cyber-neonPink/50 rotate-45"></div>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};